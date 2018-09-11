import {
  ALARM_ACKSTATE_REQUIREACK,
  ALARM_MODE_ALL,
  ALARM_MODE_NONNOMINAL,
  ALARM_MODE_TOACKNOWLEDGE,
  ALARM_TYPE_NOMINAL,
} from '../../../constants';

/**
 * Determines whether an alarm should be shown to the operator
 *
 * @param groundAlarm
 * @param visuWindow
 * @param mode
 * @returns {*}
 */
const shouldShowAlarm = (groundAlarm, { visuWindow, mode }) => {
  const { current, lower, upper } = visuWindow;

  const _isAlarmOpen = alarm =>
    (!alarm.closingDate || new Date(alarm.closingDate).getTime() > current);

  const _isAlarmActive = alarm =>
    _isAlarmOpen(alarm) &&
    alarm.alarmType !== ALARM_TYPE_NOMINAL &&
    new Date(alarm.creationDate).getTime() < current;

  const _hasAlarmBeenRaisedInsideVisuWindow = alarm =>
    new Date(alarm.creationDate).getTime() >= lower &&
    new Date(alarm.creationDate).getTime() <= upper;

  const _doesAlarmRequireAcknowledgment = alarm => alarm.ackState === ALARM_ACKSTATE_REQUIREACK;

  switch (mode) {
    case ALARM_MODE_NONNOMINAL:
      return _isAlarmActive(groundAlarm);
    case ALARM_MODE_ALL:
      return _isAlarmActive(groundAlarm) || _hasAlarmBeenRaisedInsideVisuWindow(groundAlarm);
    case ALARM_MODE_TOACKNOWLEDGE:
      return _isAlarmOpen(groundAlarm) && _doesAlarmRequireAcknowledgment(groundAlarm);
    default:
      return true;
  }
};

export default shouldShowAlarm;

