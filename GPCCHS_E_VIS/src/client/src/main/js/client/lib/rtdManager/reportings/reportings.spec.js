import sinon from 'sinon';
import { connect } from 'rtd/catalogs';
import { Reporting as loadReportings } from 'rtd/stubs/loaders';
import { Reporting as generateReporting } from 'rtd/stubs/generators';
import { should } from '../../common/test';
import {
  getShortDescription,
  getLongDescription,
  getAliases,
  getMonitoringLaws,
  getCalibrationFunctions,
  getSignificativityConditions,
  getComputedParameterFormula,
  getComputedParameterTriggers,
} from './';
import monitorings from '../monitorings';
import { SDB_NAMESPACE } from '../constants';

const socket = '/tmp/rtd.sock';
const mockRedis = true;
const sessionId = 0;
const domainId = 3;

let reporting;
const items = [
  generateReporting({ name: 'TEST_ITEM1', namespace: SDB_NAMESPACE, uid: 1, domainId }),
];

let rtd;

let monitoringStub;
let rtdStub;

describe('rtdManager/reportings', () => {
  beforeAll((done) => {
    monitoringStub = sinon.stub(monitorings, 'getTriggers').callsFake((opts, monitoring, callback) => {
      callback(null, 'StubTriggers');
    });
    connect({ socket, mockRedis }, (err, catalogApi) => {
      expect(err).toBeFalsy();
      expect(catalogApi).toBeDefined();
      rtd = catalogApi;
      loadReportings(rtd.getDatabase().getClient(), { sessionId, domainId, items }, done);
    });
  });
  afterAll(() => {
    monitoringStub.restore();
  });
  beforeEach((done) => {
    rtd.getCatalogByName('Reporting', SDB_NAMESPACE, 'TEST_ITEM1', sessionId, domainId, (getErr, item) => {
      expect(getErr).toBeFalsy();
      expect(item).toBeDefined();
      reporting = item;
      rtdStub = sinon.stub(rtd, 'getCatalogByName').callsFake((catalog, namespace, name, session, domain, callback) => {
        callback(null, 'StubMonitoring');
      });
      done(null);
    });
  });
  afterEach(() => {
    if (rtdStub) {
      rtdStub.restore();
    }
  });
  it('getShortDescription', (done) => {
    getShortDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      expect(typeof desc).toBe('string');
      done();
    });
  });
  it('getLongDescription', (done) => {
    getLongDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      expect(typeof desc).toBe('string');
      done();
    });
  });
  it('getAliases', (done) => {
    getAliases({ rtd, sessionId, domainId }, reporting, (err, aliases) => {
      expect(typeof aliases).toBe('array');
      expect(typeof aliases[0]).toBe('object');
      expect(aliases[0]).toHaveProperty('Alias');
      expect(aliases[0]).toHaveProperty('ContextDomain');
      done();
    });
  });
  it('getMonitoringLaws', (done) => {
    getMonitoringLaws({ rtd, sessionId, domainId }, reporting, (err, laws) => {
      const keys = Object.keys(laws);
      expect(keys).toHaveLength(1);
      expect(keys[0]).be.oneOf(['OnGround', 'OnBoard']);
      expect(laws[keys[0]]).be.an('array').toHaveLength(2);
      expect(laws[keys[0]][0]).have.a.properties({ Triggers: 'StubTriggers' });
      done();
    });
  });
  it('getSignificativityConditions', (done) => {
    getSignificativityConditions({ rtd, sessionId, domainId }, reporting, (err, conds) => {
      expect(typeof conds).toBe('array');
      expect(typeof conds[0]).toBe('object');
      expect(conds[0]).toHaveProperty('DomainApplicability');
      done();
    });
  });
  it('getCalibrationFunctions', (done) => {
    getCalibrationFunctions({ rtd, sessionId, domainId }, reporting, (err, funcs) => {
      expect(typeof funcs).toBe('object');
      expect(typeof funcs).toBe('object');
      expect(typeof funcs).toBe('array');
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
      expect(typeof formula).toBe('string');
      done();
    });
  });
  it('getComputedParameterTriggers', (done) => {
    getComputedParameterTriggers({ rtd, sessionId, domainId }, reporting, (err, triggers) => {
      expect(typeof triggers).toBe('array');
      done();
    });
  });
});
