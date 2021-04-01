import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

import SaveCloseButtons from '@iobroker/adapter-react/Components/SaveCloseButtons';
import Router from '@iobroker/adapter-react/Components/Router';
import theme from '@iobroker/adapter-react/Theme';
import ConfirmDialog from '@iobroker/adapter-react/Dialogs/Confirm';
import I18n from '@iobroker/adapter-react/i18n';

import JsonConfigComponent from './JsonConfigComponent';

const styles = {
    scroll: {
        height: 'calc(100% - 48px - 48px)',
        overflowY: 'auto'
    }
};

class JsonConfig extends Router {
    constructor(props) {
        super(props);

        this.state = {
            schema: null,
            data: null,
            common: null,
            changed: false,
            confirmDialog: false,
            theme: theme(props.themeName), // buttons requires special theme
        };

        this.getInstanceObject()
            .then(obj => {
                return this.getConfigFile()
                    .then(schema => this.setState({schema, data: obj.native, common: obj.common}));
            });
    }

    getConfigFile() {
        return this.props.socket.readFile(this.props.adapterName + '.admin', 'jsonConfig.json')
            .then(data => {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    window.alert('Cannot parse json config!');
                }
            });
    }

    getInstanceObject() {
        return this.props.socket.getObject(`system.adapter.${this.props.adapterName}.${this.props.instance}`);
    }

    renderConfirmDialog() {
        if (!this.state.confirmDialog) {
            return null;
        }
        return <ConfirmDialog
            title={ I18n.t('Please confirm') }
            text={ I18n.t('Some data are not stored. Discard?') }
            ok={ I18n.t('Discard') }
            cancel={ I18n.t('Cancel') }
            onClose={isYes =>
                this.setState({ confirmDialog: false}, () => isYes && Router.doNavigate(null))}
        />;
    }

    async closeDialog(doSave) {
        if (doSave) {
            const obj = await this.getInstanceObject();

            for (const a in this.state.data) {
                if (this.state.data.hasOwnProperty(a)) {
                    obj.native[a] = this.state.data[a];
                }
            }

            await this.props.socket.setObject(obj._id, obj);
        } else {
            if (this.state.changed) {
                return this.setState({confirmDialog: true});
            } else {
                Router.doNavigate(null);
            }
        }
    }

    render() {
        const { classes } = this.props;

        if (!this.state.data || !this.state.schema) {
            return <LinearProgress />;
        }

        return <>
            {this.renderConfirmDialog()}
            <JsonConfigComponent
                className={ classes.scroll }
                socket={this.props.socket}
                theme={this.props.theme}
                themeName={this.props.themeName}
                themeType={this.props.themeType}
                adapterName={this.props.adapterName}
                instance={this.props.instance}

                schema={this.state.schema}
                common={this.state.common}
                data={this.state.data}
                onError={error => this.setState({error})}
                onChange={(data, changed) => this.setState({data, changed})}
            />
            <SaveCloseButtons
                dense={true}
                paddingLeft={this.props.menuPadding}
                theme={this.state.theme}
                noTextOnButtons={this.props.width === 'xs' || this.props.width === 'sm' || this.props.width === 'md'}
                changed={!this.state.error && this.state.changed}
                error={this.state.error}
                onSave={() => this.closeDialog(true)}
                onClose={() => this.closeDialog(false)}
            />
        </>;
    }
}

JsonConfig.propTypes = {
    menuPadding: PropTypes.number,
    adapterName: PropTypes.string,
    instance: PropTypes.number,

    socket: PropTypes.object,

    theme: PropTypes.object,
    themeName: PropTypes.string,
    themeType: PropTypes.string,
};

export default withStyles(styles)(JsonConfig);