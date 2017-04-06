import { mock as mockRedis, unmock as unmockRedis } from 'rtd/stubs/redis';
import rtd from 'rtd/catalogs';
import loadMonitorings from 'rtd/stubs/loaders/monitoring';
import { generate } from 'rtd/stubs/items/monitoring';
import { should } from '../../common/test';
import { getTriggers } from './';
import { SDB_NAMESPACE } from '../constants';


const socket = '/tmp/rtd.sock';
const sessionId = 0;
const domainId = 3;

const items = [
  generate({ name: 'ONBOARD_DELTA', namespace: SDB_NAMESPACE, domainId, type: 'onBoard', checkType: 'delta' }),
  generate({ name: 'ONBOARD_LIMIT', namespace: SDB_NAMESPACE, domainId, type: 'onBoard', checkType: 'limit' }),
  generate({ name: 'ONBOARD_EXPECTED', namespace: SDB_NAMESPACE, domainId, type: 'onBoard', checkType: 'expected' }),
  generate({ name: 'ONGROUND_LIMIT', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'limit' }),
  generate({ name: 'ONGROUND_MAX_DELTA', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'maxDelta' }),
  generate({ name: 'ONGROUND_MIN_DELTA', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'minDelta' }),
  generate({ name: 'ONGROUND_EXPECTED', namespace: SDB_NAMESPACE, domainId, type: 'onGround', checkType: 'expected' }),
  generate({ name: 'FUNCTIONAL', namespace: SDB_NAMESPACE, domainId, type: 'functional' }),
];

// TODO tests to complete

describe('rtdManager/monitorings', () => {
  before((done) => {
    mockRedis();
    rtd.connect(socket, (err, isConnected) => {
      should.not.exist(err);
      isConnected.should.eql(true);
      loadMonitorings(rtd.getDatabase().getClient(), { sessionId, domainId, items }, done);
    });
  });
  after(() => {
    unmockRedis();
  });
  it('getTriggers OnBoard Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onBoard',
          CheckType: 'deltaCheck',
        });
        triggers.should.have.a.property('LowLimit');
        triggers.should.have.a.property('HighLimit');
        done();
      });
    });
  });
  it('getTriggers OnBoard Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_LIMIT', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onBoard',
          CheckType: 'limitCheck',
        });
        triggers.should.have.a.property('LowLimit');
        triggers.should.have.a.property('HighLimit');
        done();
      });
    });
  });
  it('getTriggers OnBoard Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONBOARD_EXPECTED', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onBoard',
          CheckType: 'expectedValueCheck',
        });
        triggers.should.have.a.property('ExpectedValue');
        triggers.should.have.a.property('Event');
        triggers.should.have.a.property('Mask');
        done();
      });
    });
  });
  it('getTriggers OnGround Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_LIMIT', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'LimitCheck',
        });
        triggers.should.have.a.property('LowerLimits').that.is.an('array');
        triggers.should.have.a.property('UpperLimits').that.is.an('array');
        done();
      });
    });
  });
  it('getTriggers OnGround Maximum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_MAX_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'MaximumDeltaCheck',
        });
        triggers.should.have.a.property('AlarmLevel').that.is.a('string');
        triggers.should.have.a.property('Threshold').that.is.an('string');
        done();
      });
    });
  });
  it('getTriggers OnGround Minimum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_MIN_DELTA', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'MinimumDeltaCheck',
        });
        triggers.should.have.a.property('AlarmLevel').that.is.a('string');
        triggers.should.have.a.property('Threshold').that.is.an('string');
        done();
      });
    });
  });
  it('getTriggers OnGround Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ONGROUND_EXPECTED', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'onGround',
          CheckType: 'ExpectedValueCheck',
        });
        triggers.should.have.a.property('AlarmLevel').that.is.a('string');
        triggers.should.have.a.property('ReferenceValues').that.is.an('array');
        done();
      });
    });
  });
  it('getTriggers Functional', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'FUNCTIONAL', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.properties({
          MonitoringType: 'functional',
        });
        triggers.should.have.a.property('Event').that.is.an('object');
        triggers.should.have.a.property('Checks').that.is.an('array');
        done();
      });
    });
  });
});
