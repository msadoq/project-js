// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on right-click
// VERSION : 1.1.2 : DM : #3622 : 08/03/2017 : update rtdManager tests and onOpenInspector controller
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add styles for the inspector
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : update tests for rtd data retrieving
// VERSION : 1.1.2 : DM : #5828 : 03/05/2017 : update rtdManager tests due to rtd stubs updates
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : remove use of sinon for rtd stub
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : fix the rtd manager tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Migrate all rtdManager test for jest
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for mocha .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper modules
// END-HISTORY
// ====================================================================

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
  test('getTriggers OnBoard Delta', (done) => {
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
  test('getTriggers OnBoard Limit', (done) => {
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
  test('getTriggers OnBoard Expected Value', (done) => {
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
  test('getTriggers OnGround Limit', (done) => {
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
  test('getTriggers OnGround Maximum Delta', (done) => {
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
  test('getTriggers OnGround Minimum Delta', (done) => {
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
  test('getTriggers OnGround Expected Value', (done) => {
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
  test('getTriggers Functional', (done) => {
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
