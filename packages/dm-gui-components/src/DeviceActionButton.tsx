import React from 'react';

import { ActionBase, DeviceAction } from '@iobroker/dm-utils/build/types/api';
import TooltipButton from './TooltipButton';
import { renderActionIcon, getTranslation } from './Utils';

interface DeviceActionButtonProps {
    deviceId: string;
    action: DeviceAction;
    refresh: () => void;
    deviceHandler: (deviceId: string, action: ActionBase, refresh: () => void) => () => void;
    disabled?: boolean;
}

export default function DeviceActionButton(props: DeviceActionButtonProps): React.JSX.Element {
    const {
        deviceId, action, refresh, deviceHandler, disabled,
    } = props;

    const icon = renderActionIcon(action);

    const tooltip = getTranslation(action.description) || (icon ? null : action.id);

    return <TooltipButton
        // label={action.description ? getTranslation(action.description) : (icon ? null : action.id)}
        tooltip={tooltip}
        disabled={disabled || action.disabled}
        Icon={icon}
        onClick={deviceHandler(deviceId, action, refresh)}
    />;
}
