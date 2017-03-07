import { mock as mockRedis, unmock as unmockRedis } from 'rtd/lib/stubs/redis';
import rtd from 'rtd/lib/catalogs';
import { createReportings, createMonitorings } from 'rtd/lib/stubs/database';
import { should } from '../../common/test';
import {
  getShortDescription,
  getLongDescription,
  getAliases,
  getMonitoringLaws,
  getCalibrationFunctions,
  getComputedParameterFormula,
  getComputedParameterTriggers,
} from './';
import { SDB_NAMESPACE } from '../constants';

const socket = '/tmp/rtd.sock';
const sessionId = 0;
const domainId = 3;

let reporting;
const itemNames = ['toto', 'titi'];

let called;
const rtdStub = {
  getCatalogByName: (...args) => {
    called = args;
  },
  reset: () => { called = []; },
};

describe.only('rtdManager/reportings', () => {
  before((done) => {
    mockRedis();
    rtd.connect(socket, (err, isConnected) => {
      should.not.exist(err);
      isConnected.should.eql(true);
      createReportings(rtd.getDatabase().getClient(), { sessionId, domainId, itemNames }, () => {
        createMonitorings(rtd.getDatabase().getClient(), { sessionId, domainId }, () => {
          console.log('done');
          done();
        });
      });
    });
  });
  after(() => {
    unmockRedis();
  });
  beforeEach((done) => {
    rtdStub.reset();
    rtd.getCatalogByName('Reporting', SDB_NAMESPACE, 'toto', sessionId, domainId, (getErr, item) => {
      reporting = item;
      done(null);
    });
  });
  it('getShortDescription', (done) => {
    getShortDescription({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
  it('getLongDescription', (done) => {
    getLongDescription({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
  it('getAliases', (done) => {
    getAliases({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
  it('getMonitoringLaws', (done) => {
    getMonitoringLaws({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
  /* it('getSignificativity', (done) => {
    getSignificativity({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  it('getCalibrationFunctions', (done) => {
    getCalibrationFunctions({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
  /* it('getTMPackets', (done) => {
    getTMPackets({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  /* it('getComputingDefinitions', (done) => {
    getComputingDefinitions({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  it('getComputedParameterFormula', (done) => {
    getComputedParameterFormula({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
  it('getComputedParameterTriggers', (done) => {
    getComputedParameterTriggers({ rtdStub, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });
});
