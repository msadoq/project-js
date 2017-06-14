import { connect } from 'rtd/catalogs';
import { Monitoring as loadMonitorings } from 'rtd/stubs/loaders';
import { Monitoring as generateMonitoring } from 'rtd/stubs/generators';
import { getTriggers } from './';
import { SDB_NAMESPACE } from '../constants';


const socket = '/tmp/rtd.sock';
const mockRedis = true;
const sessionId = 0;
const domainId = 3;

const items = [
  generateMonitoring({ name: 'ONBOARD_DELTA', namespace: SDB_NAMESPACE, domainId, type: 'onBoard', checkType: 'delta' }),
  generateMonitoring({ name: 'ONBOARD_LIMIT', namespace: SDB_NAMESPACE, domainId, type: 'onBoard', checkType: 'limit' }),
  generateMonitoring({ name: 'ONBOARD_EXPECTED', namespace: SDB_NAMESPACE, domainId, type: 'onBoard', checkType: 'expected' }),
  generateMonitoring({ name: 'ONGROUND_LIMIT', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'limit' }),
  generateMonitoring({ name: 'ONGROUND_MAX_DELTA', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'maxDelta' }),
  generateMonitoring({ name: 'ONGROUND_MIN_DELTA', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'minDelta' }),
  generateMonitoring({ name: 'ONGROUND_EXPECTED', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'expected' }),
  generateMonitoring({ name: 'FUNCTIONAL', namespace: SDB_NAMESPACE, domainId, type: 'functional' }),
];

let rtd;

// TODO tests to complete

describe('rtdManager/monitorings', () => {
  beforeAll((done) => {
    connect({ socket, mockRedis }, (err, api) => {
      expect(err).toBeFalsy();
      expect(api).toBeDefined();
      rtd = api;
      loadMonitorings(rtd.getDatabase().getClient(), { sessionId, domainId, items }, done);
    });
  });
  it('getTriggers OnBoard Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onBoard');
          expect(triggers).toHaveProperty('CheckType', 'deltaCheck');
          expect(triggers).toHaveProperty('LowLimit');
          expect(triggers).toHaveProperty('HighLimit');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers OnBoard Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_LIMIT', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onBoard');
          expect(triggers).toHaveProperty('CheckType', 'limitCheck');
          expect(triggers).toHaveProperty('LowLimit');
          expect(triggers).toHaveProperty('HighLimit');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers OnBoard Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_EXPECTED', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onBoard');
          expect(triggers).toHaveProperty('CheckType', 'expectedValueCheck');
          expect(triggers).toHaveProperty('ExpectedValue');
          expect(triggers).toHaveProperty('Event');
          expect(triggers).toHaveProperty('Mask');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers OnGround Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_LIMIT', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onGround');
          expect(triggers).toHaveProperty('CheckType', 'LimitCheck');
          expect(triggers).toHaveProperty('LowerLimits');
          expect(triggers).toHaveProperty('UpperLimits');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers OnGround Maximum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_MAX_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onGround');
          expect(triggers).toHaveProperty('CheckType', 'MaximumDeltaCheck');
          expect(triggers).toHaveProperty('Threshold', 'maxThreshold');
          expect(triggers).toHaveProperty('AlarmLevel', 'Danger');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers OnGround Minimum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_MIN_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onGround');
          expect(triggers).toHaveProperty('CheckType', 'MinimumDeltaCheck');
          expect(triggers).toHaveProperty('Threshold', 'minThreshold');
          expect(triggers).toHaveProperty('AlarmLevel', 'Warning');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers OnGround Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_EXPECTED', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'onGround');
          expect(triggers).toHaveProperty('CheckType', 'ExpectedValueCheck');
          expect(triggers).toHaveProperty('Value');
          expect(triggers).toHaveProperty('ReferenceValues');
          expect(triggers).toHaveProperty('ValueCheckType', 'equalityCheck');
          expect(triggers).toHaveProperty('AlarmLevel', 'Critical');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
  it('getTriggers Functional', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'FUNCTIONAL', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        try {
          expect(triggers).toHaveProperty('MonitoringType', 'functional');
          expect(triggers).toHaveProperty('Checks');
          expect(triggers).toHaveProperty('Event');
          done();
        } catch (e) {
          done.fail(e);
        }
      });
    });
  });
});
