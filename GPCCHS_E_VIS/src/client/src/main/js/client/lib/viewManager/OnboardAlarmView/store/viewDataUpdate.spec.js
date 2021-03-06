import { shouldAlarmBeDisplayed } from './viewDataUpdate';
import * as constants from 'constants';

describe('shouldAlarmBeDisplayed', () => {
  const epMode_ALL = constants.ALARM_MODE_ALL;
  const epMode_NONNOMINAL = constants.ALARM_MODE_NONNOMINAL;
  const epMode_TOACKNOWLEDGE = constants.ALARM_MODE_TOACKNOWLEDGE;
  const typeOfAlarm_NOMINAL = 'nominal';
  const typeOfAlarm_CRITICAL = 'critical';
  const typeOfAlarm_SEVERE = 'severe';
  const timeOutOfRange_FALSE = false;
  const timeOutOfRange_TRUE = true;
  const stateOfAck_REQUIREACK = constants.ALARM_ACKSTATE_REQUIREACK;
  const stateOfAck_ACQUITED = constants.ALARM_ACKSTATE_ACQUITED;
  const stateOfAck_NOACK = constants.ALARM_ACKSTATE_NOACK;
  test('onboard alarm mode is ALL : alarms in time range should be displayed', () => {
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_ACQUITED)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_ACQUITED)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_ACQUITED)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_NOACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_NOACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_NOACK)).toBe(true);
  });
  test('onboard alarm mode is ALL : alarms out of time range should not be displayed', () => {
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_ALL, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_NOACK)).toBe(false);
  });
  test('onboard alarm mode is NONNOMINAL : alarms in time range, not with type NOMINAL should be displayed', () => {
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_ACQUITED)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_ACQUITED)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_NOACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_NOACK)).toBe(true);
  });
  test('onboard alarm mode is NONNOMINAL : alarms out of time range should not be displayed', () => {
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_REQUIREACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_NONNOMINAL, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_NOACK)).toBe(false);
  });
  test('onboard alarm mode is TOACKNOWLEDGE : only alarms with state REQUIREACK should be displayed', () => {
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_NOMINAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_CRITICAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_FALSE, typeOfAlarm_SEVERE, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_REQUIREACK)).toBe(true);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_ACQUITED)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_NOMINAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_CRITICAL, stateOfAck_NOACK)).toBe(false);
    expect(shouldAlarmBeDisplayed(epMode_TOACKNOWLEDGE, timeOutOfRange_TRUE, typeOfAlarm_SEVERE, stateOfAck_NOACK)).toBe(false);
  });
});
