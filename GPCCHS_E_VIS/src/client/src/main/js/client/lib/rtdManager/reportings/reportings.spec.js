import sinon from 'sinon';
import { mock as mockRedis, unmock as unmockRedis } from 'rtd/stubs/redis';
import rtd from 'rtd/catalogs';
import { createReportings } from 'rtd/stubs/database';
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
import monitorings from '../monitorings';
import { SDB_NAMESPACE } from '../constants';

const socket = '/tmp/rtd.sock';
const sessionId = 0;
const domainId = 3;

let reporting;
const itemNames = ['TEST_ITEM1'];

let monitoringStub;
let rtdStub;

describe('rtdManager/reportings', () => {
  before((done) => {
    mockRedis();
    monitoringStub = sinon.stub(monitorings, 'getTriggers', (opts, monitoring, callback) => {
      callback(null, 'stubTriggers');
    });
    rtd.connect(socket, (err, isConnected) => {
      should.not.exist(err);
      isConnected.should.eql(true);
      createReportings(rtd.getDatabase().getClient(), { sessionId, domainId, itemNames }, done);
    });
  });
  after(() => {
    unmockRedis();
    monitoringStub.restore();
  });
  beforeEach((done) => {
    rtd.getCatalogByName('Reporting', SDB_NAMESPACE, 'TEST_ITEM1', sessionId, domainId, (getErr, item) => {
      reporting = item;
      rtdStub = sinon.stub(rtd, 'getCatalogByName', (catalog, namespace, name, session, domain, callback) => {
        callback(null, 'stubMonitoring');
      });
      done(null);
    });
  });
  afterEach(() => {
    rtdStub.restore();
  });
  it('getShortDescription', (done) => {
    getShortDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      desc.should.be.a('string');
      done();
    });
  });
  it('getLongDescription', (done) => {
    getLongDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      desc.should.be.a('string');
      done();
    });
  });
  it('getAliases', (done) => {
    getAliases({ rtd, sessionId, domainId }, reporting, (err, aliases) => {
      aliases.should.be.an('array');
      aliases[0].should.be.an('object');
      aliases[0].should.have.a.property('alias');
      aliases[0].should.have.a.property('contextDomain');
      done();
    });
  });
  it('getMonitoringLaws', (done) => {
    getMonitoringLaws({ rtd, sessionId, domainId }, reporting, (err, laws) => {
      const keys = Object.keys(laws);
      keys.should.have.lengthOf(1);
      keys[0].should.be.oneOf(['onGround', 'onBoard']);
      laws[keys[0]].should.be.an('array').that.has.lengthOf(1);
      laws[keys[0]][0].should.have.a.properties({ triggers: 'stubTriggers' });
      done();
    });
  });
  /* it('getSignificativity', (done) => {
    getSignificativity({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  it('getCalibrationFunctions', (done) => {
    getCalibrationFunctions({ rtd, sessionId, domainId }, reporting, (err, funcs) => {
      funcs.should.be.an('object');
      funcs.should.have.a.property('defaultInterpretationFunction').that.is.an('object');
      funcs.should.have.a.property('conditionalInterpretationFunctions').that.is.an('array');
      done();
    });
  });
  /* it('getTMPackets', (done) => {
    getTMPackets({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  /* it('getComputingDefinitions', (done) => {
    getComputingDefinitions({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  it('getComputedParameterFormula', (done) => {
    getComputedParameterFormula({ rtd, sessionId, domainId }, reporting, (err, formula) => {
      formula.should.be.a('string');
      done();
    });
  });
  it('getComputedParameterTriggers', (done) => {
    getComputedParameterTriggers({ rtd, sessionId, domainId }, reporting, (err, triggers) => {
      triggers.should.be.an('array');
      done();
    });
  });
});
