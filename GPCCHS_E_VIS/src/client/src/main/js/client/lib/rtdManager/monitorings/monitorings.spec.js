import { mock as mockRedis, unmock as unmockRedis } from 'rtd/stubs/redis';
import rtd from 'rtd/catalogs';
import { createMonitorings } from 'rtd/stubs/database';
import { should } from '../../common/test';
import { getTriggers } from './';
import { SDB_NAMESPACE } from '../constants';


const socket = '/tmp/rtd.sock';
const sessionId = 0;
const domainId = 3;

const itemNames = ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'];

// TODO tests to complete

describe('rtdManager/monitorings', () => {
  before((done) => {
    mockRedis();
    rtd.connect(socket, (err, isConnected) => {
      should.not.exist(err);
      isConnected.should.eql(true);
      createMonitorings(rtd.getDatabase().getClient(), { sessionId, domainId, itemNames }, done);
    });
  });
  after(() => {
    unmockRedis();
  });
  it('getTriggers OnBoard Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_1', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers OnBoard Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_2', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers OnBoard Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_3', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers OnGround Limit', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_4', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers OnGround Maximum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_5', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers OnGround Minimum Delta', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_6', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers OnGround Expected Value', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_7', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
  it('getTriggers Functional', (done) => {
    rtd.getCatalogByName('Monitoring', SDB_NAMESPACE, 'ITEM_8', sessionId, domainId, (getErr, item) => {
      getTriggers({ rtd, sessionId, domainId }, item, (err, triggers) => {
        triggers.should.be.an('object').that.have.a.property('MonitoringType');
        done();
      });
    });
  });
});
