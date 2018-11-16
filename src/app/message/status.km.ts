export class StatusKM {
    statusMessage: string;
    statusTimer: number;
    statusType: string;
}
const StatusMessages = {
    statusFailed: {
        statusMessage: '',
        statusTimer: 5000,
        statusType: 'danger-dark',
    },
    statusSuccess: {
        statusMessage: '',
        statusTimer: 5000,
        statusType: 'success-dark',
    },
    statusWarning: {
        statusMessage: '',
        statusTimer: 5000,
        statusType: 'warning-dark',
    },
    statusInfo: {
        statusMessage: '',
        statusTimer: 5000,
        statusType: 'info-dark',
    },
};

export function generateStatusObject(message: string, type: string, timer: number) {
    if (type === 'danger') {
        StatusMessages.statusFailed.statusMessage = message;
        if (timer != null) { StatusMessages.statusFailed.statusTimer = timer; }
        return StatusMessages.statusFailed;
    } else if (type === 'success') {
        StatusMessages.statusSuccess.statusMessage = message;
        if (timer != null) { StatusMessages.statusSuccess.statusTimer = timer; }
        return StatusMessages.statusSuccess;
    } else if (type === 'warning') {
        StatusMessages.statusWarning.statusMessage = message;
        if (timer != null) { StatusMessages.statusWarning.statusTimer = timer; }
        return StatusMessages.statusWarning;
    } else {
        StatusMessages.statusInfo.statusMessage = message;
        if (timer != null) { StatusMessages.statusInfo.statusTimer = timer; }
        return StatusMessages.statusInfo;
    }
}
