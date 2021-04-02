import React, { useEffect, useState } from 'react';
import { Checkbox, FormControl, InputLabel, LinearProgress, MenuItem, Select, Switch } from '@material-ui/core';
import CustomModal from '../components/CustomModal';
import Utils from '@iobroker/adapter-react/Components/Utils';
import Icon from '@iobroker/adapter-react/Components/Icon';
import I18n from '@iobroker/adapter-react/i18n';

const readWriteArray = [
    {
        Owner: [
            { name: 'read', valueNum: 0x400, title: 'read owner' },
            { name: 'write', valueNum: 0x200, title: 'write owner' }
        ]
    },
    {
        Group: [
            { name: 'read', valueNum: 0x40, title: 'read group' },
            { name: 'write', valueNum: 0x20, title: 'write group' }
        ]
    },
    {
        Everyone: [
            { name: 'read', valueNum: 0x4, title: 'read everyone' },
            { name: 'write', valueNum: 0x2, title: 'write everyone' }
        ]
    },
];

const newValueAccessControl = (value, newValue, mask) => {
    value |= newValue & mask;
    value &= newValue | (~mask & 0xFFFF);
    return value;
}

const ObjectRights = ({ value, setValue, t, differentValues, applyToChildren, mask, setMask, disabled }) => {
    useEffect(() => {
        if (applyToChildren) {
            let _checkDifferent = 0;
            let i = 1;
            while (i < 0x1000) {
                for (let e = 0; e < differentValues.length; e++) {
                    if (value & i) {
                        if (!(differentValues[e] & i)) {
                            _checkDifferent |= i;
                        }
                    } else {
                        if (differentValues[e] & i) {
                            _checkDifferent |= i;
                        }
                    }
                }
                i = i << 1;
            }
            setMask(_checkDifferent);
        } else {
            setMask(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [differentValues, applyToChildren]);

    let newSelected = value;

    return <div style={{
        display: 'flex',
        width: 'fit-content',
        margin: 20,
        border: '1px solid',
        borderLeft: 0
    }}>
        {readWriteArray.map(el => {
            const name = Object.keys(el)[0];
            return <div style={{
                width: 150,
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderLeft: '1px solid'
            }} key={name} >
                <div style={{
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 18,
                    borderBottom: '1px solid silver',
                    width: '100%',
                    justifyContent: 'center'
                }}>{t(name)}</div>
                <div style={{
                    display: 'flex',
                    width: '100%'
                }}>
                    {el[name].map((obj, idx) => {
                        let bool = false;
                        if (newSelected - obj.valueNum >= 0) {
                            newSelected = newSelected - obj.valueNum;
                            bool = true;
                        }
                        return <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            alignItems: 'center',
                            borderRight: idx === 0 ? '1px solid' : 0
                        }} key={obj.valueNum}>
                            <div style={{
                                height: 50,
                                borderBottom: '1px solid',
                                width: '100%',
                                justifyContent: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                color: 'silver'
                            }}>{t(obj.name)}</div>
                            <div style={{ height: 50, display: 'flex' }}>
                                <Checkbox
                                    disabled={disabled}
                                    checked={bool}
                                    color={mask & obj.valueNum ? 'primary' : 'secondary'}
                                    indeterminate={!!(mask & obj.valueNum)}
                                    style={mask & obj.valueNum ? { opacity: 0.5 } : null}
                                    onChange={e => {
                                        if (mask & obj.valueNum) {
                                            mask &= (~obj.valueNum) & 0xFFFF;
                                            setMask(mask);
                                        }
                                        let newValue = value;
                                        if (!e.target.checked) {
                                            newValue &= (~obj.valueNum) & 0xFFFF;
                                        } else {
                                            newValue |= obj.valueNum;
                                        }
                                        setValue(newValue);
                                    }}
                                />
                            </div>
                        </div>
                    })}
                </div>
            </div>
        })}
    </div>;
}

function getBackgroundColor(textColor, themeType) {
    if (!textColor) {
        return undefined;
    } else {
        const invertedColor = Utils.invertColor(textColor, true);
        if (invertedColor === '#FFFFFF' && themeType === 'dark') {
            return '#DDD';
        }
        if (invertedColor === '#000000' && themeType === 'light') {
            return '#222';
        }
        return undefined;
    }
}

function sortFolders(a, b) {
    if (a.folder && b.folder) {
        return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
    } else if (a.folder) {
        return -1;
    } else if (b.folder) {
        return 1;
    } else {
        return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)
    }
}

const loadFolders = async (folderId, _newFolders, socket) => {
    const parts = folderId.split('/');
    const level = parts.length;
    const adapter = parts.shift();
    const relPath = parts.join('/');
    await socket.readDir(adapter, relPath)
        .then(async files => {
            for (let f = 0; f < files.length; f++){
                const file = files[f];
                const item = {
                    id: folderId + '/' + file.file,
                    ext: Utils.getFileExtension(file.file),
                    folder: file.isDir,
                    name: file.file,
                    size: file.stats && file.stats.size,
                    modified: file.modifiedAt,
                    acl: file.acl,
                    level
                };

                _newFolders && _newFolders.push(item);

                if (item.folder) {
                    await loadFolders(item.id, _newFolders, socket);
                }
            }
        });

    return _newFolders;
}

async function _loadFolders (folderId, folders, socket) {
    let files = folders[folderId];
    if (!files) {
        const parts = folderId.split('/');
        const level = parts.length;
        const adapter = parts.shift();
        const relPath = parts.join('/');
        files = await socket.readDir(adapter, relPath);
        folders[folderId] = [];
        for (let f = 0; f < files.length; f++) {
            const file = files[f];
            const item = {
                id: folderId + '/' + file.file,
                ext: Utils.getFileExtension(file.file),
                folder: file.isDir,
                name: file.file,
                size: file.stats && file.stats.size,
                modified: file.modifiedAt,
                acl: file.acl,
                level
            };
            folders[folderId].push(item);
        }
    }

    for (let f = 0; f < files.length; f++) {
        const item = files[f];
        if (item.folder) {
            await _loadFolders(item.id, folders, socket);
        }
    }
}

function flatList(folders) {
    const list = {};

    Object.keys(folders)
        .forEach(key => {
            list[key] = {
                folder: true
            };
            folders[key].forEach(item => {
                list[item.id] = item;
            });
        });

    return list;
}

async function loadPath(socket, folders, path, adapter, part, level) {
    if (typeof path === 'string') {
        path = path.split('/');
        level = 0;
        adapter = path.shift();
        part = '';
    }

    if (path.length >= level) {
        return;
    }

    if (folders[adapter + part]) {
        if (path.length - 1 === level) {
            // try to find file
            const aa = adapter + part + '/' + path[level];
            const ff = folders[adapter + part].find(item => item.id === aa);
            if (ff && ff.folder) {
                // load all
                await _loadFolders(adapter + part, folders, socket);
            }
            return;
        }
        part += '/' + path[level];

        await loadPath(socket, folders, path, adapter, part, level + 1);
    } else {
        // load path
        const files = await socket.readDir(adapter, part);
        folders[adapter + part] = [];
        files.forEach(file => {
            const item = {
                id:       part + '/' + file.file,
                ext:      Utils.getFileExtension(file.file),
                folder:   file.isDir,
                name:     file.file,
                size:     file.stats && file.stats.size,
                modified: file.modifiedAt,
                acl:      file.acl,
                level
            };

            folders[adapter + part].push(item);
        });

        await loadPath(socket, folders, path, adapter, part, level + 1);
    }
}

const FileEditOfAccessControl2 = ({ onClose, onApply, open, selected, extendObject, objects, t, themeType, folders, socket }) => {
    const select = selected.substring(0, selected.lastIndexOf('/')) || selected;
    const object = selected.split('/').length === 1 ? folders['/'].find(({ id }) => id === selected) : folders[select].find(({ id }) => id === selected);
    const [stateOwnerUser, setStateOwnerUser] = useState(null);
    const [stateOwnerGroup, setStateOwnerGroup] = useState(null);
    const [ownerUsers, setOwnerUsers] = useState([]);
    const [ownerGroups, setOwnerGroups] = useState([]);
    const [applyToChildren, setApplyToChildren] = useState(false);
    const [childrenCount, setChildrenCount] = useState(0);
    const [valueFileAccessControl, setValueFileAccessControl] = useState(null);
    const [differentOwner, setDifferentOwner] = useState(false);
    const [differentGroup, setDifferentGroup] = useState(false);
    const [differentObject, setDifferentObject] = useState([]);
    const [maskObject, setMaskObject] = useState(0);
    const [ids, setIds] = useState([]);
    const [disabledButton, setDisabledButton] = useState(true);
    const [progress, setProgress] = useState(false);

    const different = t('different');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        let _differentObject = [];

        let id = object.id;
        let groups = [];
        let users = [];
        const lang = I18n.getLanguage();

        let _differentOwner = false;
        let _differentGroup = false;
        let _stateOwnerUser = null;
        let _stateOwnerGroup = null;
        let _valueFileAccessControl = null;
        const _ids = [];
        let count = 0

        await loadPath(socket, folders, id);

        const list = flatList(folders);

        let idWithSlash = id + '/';

        Object.keys(list).forEach(key => {
            if (key === '/') {
                return;
            }

            if (key === id || key.startsWith(idWithSlash)) {
                if (!key.includes('/') && objects[key]) { // it is object
                    const objFolder = objects[key];
                    count++;
                    _ids.push(objFolder);

                    if (_valueFileAccessControl === null && objFolder.acl.file !== undefined) {
                        _valueFileAccessControl = objFolder.acl.file;
                    }
                    if (_stateOwnerUser === null && objFolder.acl.owner !== undefined) {
                        _stateOwnerUser = objFolder.acl.owner;
                    }
                    if (_stateOwnerGroup === null && objFolder.acl.ownerGroup !== undefined) {
                        _stateOwnerGroup = objFolder.acl.ownerGroup;
                    }

                    if (!differentOwner && _stateOwnerUser !== objFolder.acl.owner && objFolder.acl.owner !== undefined) {
                        _differentOwner = true;
                    }
                    if (!differentGroup && _stateOwnerGroup !== objFolder.acl.ownerGroup && objFolder.acl.ownerGroup !== undefined) {
                        _differentGroup = true;
                    }
                    if (objFolder.acl.file !== undefined && _valueFileAccessControl !== objFolder.acl.file && !_differentObject.includes(objFolder.acl.file)) {
                        _differentObject.push(objFolder.acl.file);
                    }
                } else if (!list[key].folder) {
                    count++;
                    const keyFolder = list[key];
                    _ids.push(keyFolder);
                    if (_valueFileAccessControl === null && keyFolder.acl.permissions !== undefined) {
                        _valueFileAccessControl = keyFolder.acl.permissions;
                    }
                    if (_stateOwnerUser === null && keyFolder.acl.owner !== undefined) {
                        _stateOwnerUser = keyFolder.acl.owner;
                    }
                    if (_stateOwnerGroup === null && keyFolder.acl.ownerGroup !== undefined) {
                        _stateOwnerGroup = keyFolder.acl.ownerGroup;
                    }

                    if (!differentOwner && _stateOwnerUser !== keyFolder.acl.owner && keyFolder.acl.owner !== undefined) {
                        _differentOwner = true;
                    }
                    if (!differentGroup && _stateOwnerGroup !== keyFolder.acl.ownerGroup && keyFolder.acl.ownerGroup !== undefined) {
                        _differentGroup = true;
                    }
                    if (keyFolder.acl.permissions !== undefined && _valueFileAccessControl !== keyFolder.acl.permissions && !_differentObject.includes(keyFolder.acl.permissions)) {
                        _differentObject.push(keyFolder.acl.permissions);
                    }
                }
            }
        });

        // Get users and groups
        Object.keys(objects).forEach(_id => {
            const obj = objects[_id];
            if (_id.startsWith('system.group.') && obj?.type === 'group') {
                groups.push({
                    name: Utils.getObjectNameFromObj(obj, lang).replace('system.group.', ''),
                    value: _id,
                    icon: obj.common?.icon,
                    color: obj.common?.color,
                });
            } else
            if (_id.startsWith('system.user.') && obj?.type === 'user') {
                users.push({
                    name: Utils.getObjectNameFromObj(obj, lang).replace('system.user.', ''),
                    value: _id,
                    icon: obj.common?.icon,
                    color: obj.common?.color,
                });
            }
        });

        const defaultAcl = objects['system.config'].common.defaultNewAcl;

        _stateOwnerUser = _stateOwnerUser || defaultAcl.owner;
        _stateOwnerGroup = _stateOwnerGroup || defaultAcl.ownerGroup;
        _valueFileAccessControl = _valueFileAccessControl || defaultAcl.file;
        setValueFileAccessControl(_valueFileAccessControl);

        const userItem = users.find(item => item.value === _stateOwnerUser);
        const groupItem = groups.find(item => item.value === _stateOwnerGroup);
        setStateOwnerUser(userItem);
        setStateOwnerGroup(groupItem);

        setDifferentOwner(_differentOwner);
        setDifferentGroup(_differentGroup);

        setOwnerUsers(users);
        setOwnerGroups(groups);

        object.folder && setApplyToChildren(true);
        setChildrenCount(count);

        setDifferentObject(_differentObject);

        setIds(_ids);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objects, selected]);

    useEffect(() => {
        if (applyToChildren) {
            if (differentGroup) {
                stateOwnerGroup.value !== 'different' && setStateOwnerGroup({ name: different, value: 'different' });
                if (!ownerGroups.find(item => item.value === 'different')) {
                    setOwnerGroups(el => ([{
                        name: different,
                        value: 'different'
                    }, ...el]));
                }
            }

            if (differentOwner) {
                stateOwnerUser.value !== 'different' && setStateOwnerUser({ name: different, value: 'different' });
                if (!ownerUsers.find(item => item.value === 'different')) {
                    setOwnerUsers(el => ([{
                        name: different,
                        value: 'different'
                    }, ...el]));
                }
            }
        } else {
            if (stateOwnerUser && stateOwnerUser.value === 'different') {
                setStateOwnerUser(objects[selected].acl.owner);
            }
            if (stateOwnerGroup && stateOwnerGroup.value === 'different') {
                setStateOwnerGroup(objects[selected].acl.ownerGroup);
            }
            // remove different from list
            setOwnerGroups(el => el.filter(({ value }) => value !== 'different'));
            setOwnerUsers(el => el.filter(({ value }) => value !== 'different'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applyToChildren, stateOwnerUser, stateOwnerGroup, differentOwner, differentGroup]);

    if (!ids.length) {
        return <LinearProgress />;
    } else {
        return <CustomModal
            open={open}
            titleButtonApply="apply"
            overflowHidden
            applyDisabled={disabledButton}
            progress={progress}
            onClose={onClose}
            onApply={async () => {
                const defaultAclFile = objects['system.config'].common?.defaultNewAcl?.file || 0x664;

                setProgress(true);

                if (!applyToChildren) {
                    const parts = object.id.split('/');
                    const adapter = parts.shift();
                    const path = parts.join('/');
                    let newAcl = {};
                    let changed = false;
                    if (!object.folder) {
                        if (object.acl?.permissions !== valueFileAccessControl) {
                            newAcl.permissions = valueFileAccessControl;
                            changed = true;
                        }
                        if (object.acl?.owner !== stateOwnerUser.value) {
                            newAcl.owner = stateOwnerUser.value;
                            changed = true;
                        }
                        if (object.acl?.ownerGroup !== stateOwnerGroup.value) {
                            newAcl.ownerGroup = stateOwnerUser.ownerGroup;
                            changed = true;
                        }
                        changed && (await extendObject(adapter, path, newAcl));
                    } else if (!parts.length && objects[object.id]) {
                        // setObject(acl)
                        const obj = objects[object.id];
                        if (obj.acl?.file !== valueFileAccessControl) {
                            obj.acl = obj.acl || {};
                            obj.acl.file = valueFileAccessControl;
                            changed = true;
                        }
                        if (obj.acl?.owner !== stateOwnerUser.value) {
                            obj.acl = obj.acl || {};
                            obj.acl.owner = stateOwnerUser.value;
                            changed = true;
                        }
                        if (obj.acl?.ownerGroup !== stateOwnerGroup.value) {
                            obj.acl = obj.acl || {};
                            obj.acl.ownerGroup = stateOwnerGroup.value;
                            changed = true;
                        }
                        changed && (await extendObject(obj._id, obj));
                    }
                }
                else {
                    let _maskObject = ~maskObject & 0xFFFF;
                    for (let i = 0; i < ids.length; i++) {
                        const item = ids[i];
                        let changed = false;

                        if (item._id) {
                            // it is object
                            const permissions = newValueAccessControl(item.acl?.file || defaultAclFile, valueFileAccessControl, _maskObject);
                            if (permissions !== item.acl?.file) {
                                item.acl = item.acl || {};
                                item.acl.file = permissions;
                                changed = true;
                            }
                            if (stateOwnerUser.value !== 'different' && stateOwnerUser.value !== item.acl?.owner) {
                                item.acl = item.acl || {};
                                item.acl.owner = stateOwnerUser.value;
                                changed = true;
                            }
                            if (stateOwnerGroup.value !== 'different' && stateOwnerGroup.value !== item.acl?.ownerGroup) {
                                item.acl = item.acl || {};
                                item.acl.ownerGroup = stateOwnerGroup.value;
                                changed = true;
                            }
                            changed && (await extendObject(item._id, item));
                        } else {
                            if (item && !item.folder) {
                                const newAcl = {};
                                const permissions = newValueAccessControl(item.acl?.permissions || defaultAclFile, valueFileAccessControl, _maskObject);
                                if (permissions !== item.acl?.permissions) {
                                    newAcl.permissions = permissions;
                                    changed = true;
                                }
                                if (stateOwnerUser.value !== 'different' && stateOwnerUser.value !== item.acl?.owner) {
                                    newAcl.owner = stateOwnerUser.value;
                                    changed = true;
                                }
                                if (stateOwnerGroup.value !== 'different' && stateOwnerGroup.value !== item.acl?.ownerGroup) {
                                    newAcl.ownerGroup = stateOwnerGroup.value;
                                    changed = true;
                                }
                                if (changed) {
                                    const parts = item.id.split('/');
                                    const adapter = parts.shift();
                                    const path = parts.join('/');
                                    changed && (await extendObject(adapter, path, newAcl));
                                }
                            }
                        }
                    }
                }
                onApply();
            }}>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    margin: 10,
                    fontSize: 20
                }}>{t('Access control list: %s', selected)}</div>
                <div style={{ display: 'flex' }}>
                    <FormControl fullWidth style={{ marginRight: 10 }}>
                        <InputLabel>{t('Owner user')}</InputLabel>
                        <Select
                            disabled={progress}
                            value={stateOwnerUser?.value}
                            renderValue={value => <span>{stateOwnerUser?.icon ? <Icon src={stateOwnerUser?.icon} style={{ width: 16, height: 16, marginRight: 8 }} /> : null}{stateOwnerUser?.name}</span>}
                            style={stateOwnerUser?.value === 'different' ? { opacity: 0.5 } : { color: stateOwnerUser?.color || undefined, backgroundColor: getBackgroundColor(stateOwnerUser?.color, themeType) }}
                            onChange={el => {
                                const userItem = ownerUsers.find(item => item.value === el.target.value);
                                setStateOwnerUser(userItem);
                                setDisabledButton(false);
                            }}
                        >
                            {ownerUsers.map(el => <MenuItem style={el.value === 'different' ? { opacity: 0.5 } : { color: el.color || undefined, backgroundColor: getBackgroundColor(el.color, themeType) }} key={el.value} value={el.value}>
                                {el.icon ? <Icon src={el.icon} style={{ width: 16, height: 16, marginRight: 8 }} /> : null}
                                {el.name}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>{t('Owner group')}</InputLabel>
                        <Select
                            value={stateOwnerGroup?.value}
                            disabled={progress}
                            renderValue={value => <span>{stateOwnerGroup?.icon ? <Icon src={stateOwnerGroup?.icon} style={{ width: 16, height: 16, marginRight: 8 }} /> : null}{stateOwnerGroup?.name}</span>}
                            style={stateOwnerGroup?.value === 'different' ? { opacity: 0.5 } : { color: stateOwnerGroup?.color || undefined, backgroundColor: getBackgroundColor(stateOwnerGroup?.color, themeType) }}
                            onChange={el => {
                                const groupItem = ownerGroups.find(item => item.value === el.target.value);
                                setStateOwnerGroup(groupItem);
                                setDisabledButton(false);
                            }}
                        >
                            {ownerGroups.map(el => <MenuItem key={el.value} value={el.value} style={el.value === 'different' ? { opacity: 0.5 } : { color: el.color || undefined, backgroundColor: getBackgroundColor(el.color, themeType) }}>
                                {el.icon ? <Icon src={el.icon} style={{ width: 16, height: 16, marginRight: 8 }} /> : null}
                                {el.name}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                </div>

                <div style={{
                    display: 'flex',
                    margin: 10,
                    alignItems: 'center',
                    fontSize: 10,
                    marginLeft: 0,
                    color: 'silver'
                }}>
                    <div style={(!object.folder || !applyToChildren) ? { color: 'green' } : null}>{t('to apply one item')}</div>
                    <Switch
                        disabled={ids.length === 1 || progress}
                        checked={(!objects[object.id] && !!object.folder) || applyToChildren}
                        onChange={e => {
                            setApplyToChildren(e.target.checked);
                            setDisabledButton(false);
                        }}
                        color="primary"
                    />
                    <div style={(object.folder || applyToChildren) ? { color: 'green' } : null}>{t('to apply with children')} {(object.folder || childrenCount > 1) ? `(${childrenCount} ${t('object(s)')})` : ''}</div>
                </div>
                <div style={{ overflowY: 'auto' }}>
                    <div>
                        <h2>{t('File rights')}</h2>
                        <ObjectRights
                            disabled={progress}
                            mask={maskObject}
                            setMask={setMaskObject}
                            applyToChildren={applyToChildren}
                            differentValues={differentObject}
                            t={t}
                            setValue={e => {
                                setValueFileAccessControl(e);
                                setDisabledButton(false);
                            }}
                            value={valueFileAccessControl} />
                    </div>
                </div>
            </div>
        </CustomModal>;
    }
}

export default FileEditOfAccessControl2;