import { connect } from 'rtd/catalogs';
import { Monitoring as loadMonitorings } from 'rtd/stubs/loaders';
import { Monitoring as generateMonitoring } from 'rtd/stubs/generators';
import '../../common/test';
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
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onBoard',
          CheckType: 'deltaCheck',
        });
        expect(triggers).toHaveProperty('LowLimit');
        expect(triggers).toHaveProperty('HighLimit');
        done();
      });
    });
  });
  it('getTriggers OnBoard Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_LIMIT', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onBoard',
          CheckType: 'limitCheck',
        });
        expect(triggers).toHaveProperty('LowLimit');
        expect(triggers).toHaveProperty('HighLimit');
        done();
      });
    });
  });
  it('getTriggers OnBoard Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_EXPECTED', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onBoard',
          CheckType: 'expectedValueCheck',
        });
        expect(triggers).toHaveProperty('ExpectedValue');
        expect(triggers).toHaveProperty('Event');
        expect(triggers).toHaveProperty('Mask');
        done();
      });
    });
  });
  it('getTriggers OnGround Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_LIMIT', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'LimitCheck',
        });
        expect(typeof triggers).toBe('array');
        expect(typeof triggers).toBe('array');
        done();
      });
    });
  });
  it('getTriggers OnGround Maximum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_MAX_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'MaximumDeltaCheck',
        });
        expect(typeof triggers).toBe('string');
        expect(typeof triggers).toBe('string');
        done();
      });
    });
  });
  it('getTriggers OnGround Minimum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_MIN_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'MinimumDeltaCheck',
        });
        expect(typeof triggers).toBe('string');
        expect(typeof triggers).toBe('string');
        done();
      });
    });
  });
  it('getTriggers OnGround Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_EXPECTED', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'ExpectedValueCheck',
        });
        expect(typeof triggers).toBe('string');
        expect(typeof triggers).toBe('array');
        done();
      });
    });
  });
  it('getTriggers Functional', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'FUNCTIONAL', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        expect(typeof triggers).toBe('object').that.have.properties({
          MonitoringType: 'functional',
        });
        expect(typeof triggers).toBe('object');
        expect(typeof triggers).toBe('array');
        done();
      });
    });
  });
});
