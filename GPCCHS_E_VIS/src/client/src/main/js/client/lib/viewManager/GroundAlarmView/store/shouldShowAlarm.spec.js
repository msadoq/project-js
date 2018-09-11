import {
  ALARM_MODE_NONNOMINAL,
  ALARM_MODE_ALL,
  ALARM_MODE_TOACKNOWLEDGE,
} from '../../../constants';

import shouldShowAlarm from './shouldShowAlarm';

describe('GroundAlarmView shouldShowAlarm', () => {
  describe('alarm rules', () => {
    const visuWindow = {
      lower: 1536329335796, // 2018-09-07T14:08:55.796Z
      upper: 1536329935796, // 2018-09-07T14:18:55.796Z
      current: 1536329635796, // 2018-09-07T14:13:55.796Z
    };

    describe('non-nominal mode', () => { // < current time && not closed
      const mode = ALARM_MODE_NONNOMINAL;

      const nonNominalAlarmRaisedBeforeCurrent = {
        creationDate: '2018-09-07T14:13:54.796Z',
        closingDate: undefined,
        alarmType: 'danger',
        ackState: 'NO ACKNOWLEDGE',
      };

      const nonNominalAlarmRaisedAfterCurrent = {
        creationDate: '2018-09-07T14:13:56.796Z',
        closingDate: undefined,
        alarmType: 'danger',
        ackState: 'REQUIRE ACKNOWLEDGE',
      };

      const nominalAlarm = {
        creationDate: '2018-09-07T14:13:54.796Z',
        closingDate: undefined,
        alarmType: 'nominal',
        ackState: 'NO ACKNOWLEDGE',
      };

      it('should show non-nominal alarm raised before current', () => {
        expect(shouldShowAlarm(nonNominalAlarmRaisedBeforeCurrent, { visuWindow, mode }))
          .toBeTruthy();
      });

      it('should NOT show non-nominal alarm raised after current', () => {
        expect(shouldShowAlarm(nonNominalAlarmRaisedAfterCurrent, { visuWindow, mode }))
          .toBeFalsy();
      });

      it('should NOT show nominal alarm', () => {
        expect(shouldShowAlarm(nominalAlarm, { visuWindow, mode }))
          .toBeFalsy();
      });
    });
    describe('all mode', () => {
      const mode = ALARM_MODE_ALL;

      const nonNominalAlarmRaisedBeforeCurrent = {
        creationDate: '2018-09-07T14:13:54.796Z',
        closingDate: undefined,
        alarmType: 'danger',
        ackState: 'REQUIRE ACKNOWLEDGE',
      };

      const nominalAlarmRaisedInsideVisuWindow = {
        creationDate: '2018-09-07T14:09:55.796Z',
        closingDate: undefined,
        alarmType: 'danger',
        ackState: 'REQUIRE ACKNOWLEDGE',
      };

      const nominalAlarmRaisedOutsideVisuWindow = {
        creationDate: '2018-09-07T14:19:55.796Z',
        closingDate: undefined,
        alarmType: 'danger',
        ackState: 'NO ACKNOWLEDGE',
      };

      it('should show non-nominal alarm raised before current', () => {
        expect(shouldShowAlarm(nonNominalAlarmRaisedBeforeCurrent, { visuWindow, mode }))
          .toBeTruthy();
      });

      it('should show nominal alarm raised inside visualization window', () => {
        expect(shouldShowAlarm(nominalAlarmRaisedInsideVisuWindow, { visuWindow, mode }))
          .toBeTruthy();
      });

      it('should NOT show nominal alarm raised outside visualization window', () => {
        expect(shouldShowAlarm(nominalAlarmRaisedOutsideVisuWindow, { visuWindow, mode }))
          .toBeFalsy();
      });
    });
    describe('to acknowledge mode', () => {
      const mode = ALARM_MODE_TOACKNOWLEDGE;

      const unclosedAlarmToAcknowledge = {
        creationDate: '2018-09-07T14:19:55.796Z',
        closingDate: undefined,
        alarmType: 'danger',
        ackState: 'REQUIRE ACKNOWLEDGE',
      };

      const unclosedAlarmToAcknowledgeThatIsGoingToBeClosedInTheFuture = {
        creationDate: '2018-09-07T14:19:55.796Z',
        closingDate: '2018-09-07T14:13:56.796Z',
        alarmType: 'danger',
        ackState: 'REQUIRE ACKNOWLEDGE',
      };

      const closedAlarmToAcknowledge = {
        creationDate: '2018-09-07T14:18:54.796Z',
        closingDate: '2018-09-07T14:12:52.796Z',
        alarmType: 'danger',
        ackState: 'REQUIRE ACKNOWLEDGE',
      };

      const noAcknowledgeAlarm = {
        creationDate: '2018-09-07T14:18:54.796Z',
        closingDate: '2018-09-07T14:18:52.796Z',
        alarmType: 'danger',
        ackState: 'NO ACKNOWLEDGE',
      };

      it('should show unclosed alarm marked as to acknowledge', () => {
        expect(shouldShowAlarm(unclosedAlarmToAcknowledge, { visuWindow, mode }))
          .toBeTruthy();
      });

      it('should show unclosed alarm that has a known future closing date', () => {
        expect(
          shouldShowAlarm(unclosedAlarmToAcknowledgeThatIsGoingToBeClosedInTheFuture, {
            visuWindow,
            mode,
          }))
          .toBeTruthy();
      });

      it('should NOT show closed alarm marked as to acknowledge', () => {
        expect(shouldShowAlarm(closedAlarmToAcknowledge, { visuWindow, mode }))
          .toBeFalsy();
      });

      it('should NOT show alarm markes as no acknowledge', () => {
        expect(shouldShowAlarm(noAcknowledgeAlarm, { visuWindow, mode }))
          .toBeFalsy();
      });
    });
  });
});
