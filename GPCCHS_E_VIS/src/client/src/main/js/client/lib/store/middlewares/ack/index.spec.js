import configureMockStore from 'redux-mock-store';
import makeAckMiddleware from './index';
import state from '../../../common/jest/mocks/stateAlarms.json';
import { sendAlarmAck } from '../../../viewManager/GroundAlarmView/store/actions';

const unknownAction = { type: 'UNKNOWN' };

const fakeRequestAck = (tbdId, dataId, alarms, cb) => {
  if (alarms[0].oid === 'ERROR') {
    return cb('ERROR');
  }
  if (alarms[0].oid === 'TIMEOUT') {
    return undefined;
  }
  return cb();
};

const mockStore = configureMockStore([
  makeAckMiddleware(fakeRequestAck),
]);

describe('ack:middleware', () => {
  jest.useFakeTimers();
  test('it does nothing with unknown actions', () => {
    const store = mockStore(state);
    store.dispatch(unknownAction);
    expect(store.getActions()).toEqual([unknownAction]);
  });

  ['gma', 'oba'].forEach((ackType) => {
    const describeText = ackType === 'gma' ? 'GroundMonitoringAlarm' : 'OnBoardAlarm';
    describe(describeText, () => {
      const viewId = ackType === 'gma' ? Object.keys(state.GroundAlarmViewData)[0] : Object.keys(state.OnboardAlarmViewData)[0];
      test('simple ack success', () => {
        const store = mockStore(state);
        const alarms = [{ oid: 1 }];
        store.dispatch(sendAlarmAck(viewId, 'ACKID', alarms, 'COMMENT', ackType));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('several ack success', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 1 },
          { oid: 2 },
          { oid: 3 },
          { oid: 4 },
        ];
        store.dispatch(sendAlarmAck(viewId, 'ACKID', alarms, 'COMMENT', ackType));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('several ack failure', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 'ERROR' },
          { oid: 'ERROR' },
          { oid: 'ERROR' },
          { oid: 'ERROR' },
        ];
        store.dispatch(sendAlarmAck(viewId, 'ACKID', alarms, 'COMMENT', ackType));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('several ack timeout', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 'TIMEOUT' },
          { oid: 'TIMEOUT' },
          { oid: 'TIMEOUT' },
          { oid: 'TIMEOUT' },
        ];
        store.dispatch(sendAlarmAck(viewId, 'ACKID', alarms, 'COMMENT', ackType));
        jest.runAllTimers();
        expect(store.getActions()).toMatchSnapshot();
      });
      test('mixed several success, failure and timeout', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 1 },
          { oid: 2 },
          { oid: 'TIMEOUT' },
          { oid: 'ERROR' },
        ];
        store.dispatch(sendAlarmAck(viewId, 'ACKID', alarms, 'COMMENT', ackType));
        jest.runAllTimers();
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
