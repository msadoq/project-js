import sinon from 'sinon';
import { connect } from 'rtd/catalogs';
import { Reporting as loadReportings } from 'rtd/stubs/loaders';
import { Reporting as generateReporting } from 'rtd/stubs/generators';
import {
  getUnit,
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
  test('getUnit', (done) => {
    getUnit({ rtd, sessionId, domainId }, reporting, (err, unit) => {
      expect(typeof unit).toBe('string');
      done();
    });
  });
  test('getShortDescription', (done) => {
    getShortDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      expect(typeof desc).toBe('string');
      done();
    });
  });
  test('getLongDescription', (done) => {
    getLongDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      expect(typeof desc).toBe('string');
      done();
    });
  });
  test('getAliases', (done) => {
    getAliases({ rtd, sessionId, domainId }, reporting, (err, aliases) => {
      expect(aliases).toBeAnArray();
      expect(aliases[0]).toBeAnObject();
      expect(aliases[0]).toHaveProperty('Alias');
      expect(aliases[0]).toHaveProperty('ContextDomain');
      done();
    });
  });
  test('getMonitoringLaws', (done) => {
    getMonitoringLaws({ rtd, sessionId, domainId }, reporting, (err, laws) => {
      const keys = Object.keys(laws);
      expect(keys).toHaveLength(1);
      expect(keys[0]).toBeOneOf(['OnGround', 'OnBoard']);
      expect(laws[keys[0]]).toBeAnArray();
      expect(laws[keys[0]]).toHaveLength(2);
      expect(laws[keys[0]][0]).toHaveProperty('Triggers', 'StubTriggers');
      done();
    });
  });
  test('getSignificativityConditions', (done) => {
    getSignificativityConditions({ rtd, sessionId, domainId }, reporting, (err, conds) => {
      expect(conds).toBeAnArray();
      expect(conds[0]).toBeAnObject();
      expect(conds[0]).toHaveProperty('DomainApplicability');
      done();
    });
  });
  test('getCalibrationFunctions', (done) => {
    getCalibrationFunctions({ rtd, sessionId, domainId }, reporting, (err, funcs) => {
      expect(funcs).toHaveProperty('DefaultInterpretationFunction');
      expect(funcs).toHaveProperty('ConditionalInterpretationFunctions');
      expect(funcs.ConditionalInterpretationFunctions).toBeAnArray();
      done();
    });
  });
  test('getComputedParameterFormula', (done) => {
    getComputedParameterFormula({ rtd, sessionId, domainId }, reporting, (err, formula) => {
      expect(formula).toBeAString();
      done();
    });
  });
  test('getComputedParameterTriggers', (done) => {
    getComputedParameterTriggers({ rtd, sessionId, domainId }, reporting, (err, triggers) => {
      expect(triggers).toBeAnArray();
      done();
    });
  });
});
