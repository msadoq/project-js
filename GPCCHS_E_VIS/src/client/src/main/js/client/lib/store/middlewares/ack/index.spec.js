import configureMockStore from 'redux-mock-store';
import makeAckMiddleware from './index';
import state from '../../../common/jest/mocks/stateAlarms.json';
import { sendAlarmAck as gmaSendAck } from '../../../viewManager/GroundAlarmView/store/actions';
import { sendAlarmAck as obaSendAck } from '../../../viewManager/OnboardAlarmView/store/actions';

const unknownAction = { type: 'UNKNOWN' };

const sendAck = {
  gma: gmaSendAck,
  oba: obaSendAck,
};

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
  makeAckMiddleware(fakeRequestAck, 'gma'),
  makeAckMiddleware(fakeRequestAck, 'oba'),
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
        const alarms = [{ oid: 1, timestamp: 1111 }];
        store.dispatch(sendAck[ackType](viewId, 'ACKID', alarms, 'COMMENT'));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('several ack success', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 1, timestamp: 1111 },
          { oid: 2, timestamp: 2222 },
          { oid: 3, timestamp: 3333 },
          { oid: 4, timestamp: 4444 },
        ];
        store.dispatch(sendAck[ackType](viewId, 'ACKID', alarms, 'COMMENT'));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('several ack failure', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 'ERROR', timestamp: 1111 },
          { oid: 'ERROR', timestamp: 2222 },
          { oid: 'ERROR', timestamp: 3333 },
          { oid: 'ERROR', timestamp: 4444 },
        ];
        store.dispatch(sendAck[ackType](viewId, 'ACKID', alarms, 'COMMENT'));
        expect(store.getActions()).toMatchSnapshot();
      });
      test('several ack timeout', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 'TIMEOUT', timestamp: 1111 },
          { oid: 'TIMEOUT', timestamp: 2222 },
          { oid: 'TIMEOUT', timestamp: 3333 },
          { oid: 'TIMEOUT', timestamp: 4444 },
        ];
        store.dispatch(sendAck[ackType](viewId, 'ACKID', alarms, 'COMMENT'));
        jest.runAllTimers();
        expect(store.getActions()).toMatchSnapshot();
      });
      test('mixed several success, failure and timeout', () => {
        const store = mockStore(state);
        const alarms = [
          { oid: 1, timestamp: 1111 },
          { oid: 2, timestamp: 2222 },
          { oid: 'TIMEOUT', timestamp: 3333 },
          { oid: 'ERROR', timestamp: 4444 },
        ];
        store.dispatch(sendAck[ackType](viewId, 'ACKID', alarms, 'COMMENT'));
        jest.runAllTimers();
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
