// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js
//  in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Add a jest snapshot serializer to ignore uuid in
//  messages redux actions
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Write onSavePage tests + refacto jest
//  serializers
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #6818 : 16/11/2017 : Test plot view . .
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 01/02/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0 : FA : #10835 : 28/02/2018 : add global configuration for colors
// VERSION : 2.0.0 : FA : ISIS-FT-2949 : 22/03/2018 : dates now display in TAI
// END-HISTORY
// ====================================================================

import 'babel-polyfill';
import { set } from 'lodash';
import _, { difference, intersection } from 'lodash/fp';
import { v4 } from 'uuid';
import { resolve } from 'path';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import * as serializers from './serializers';

/*
  Setting up the testing framework before each test.
  Please see : https://facebook.github.io/jest/docs/cli.html#setuptestframeworkscriptfile-file
*/

global.testConfig = {
  ISIS_DOCUMENTS_ROOT: resolve(__dirname, '../../serverProcess/documentManager/fixtures'),
  WILDCARD_CHARACTER: '*',
  VISUWINDOW_MAX_LENGTH: 42,
  VISUWINDOW_CURRENT_UPPER_MIN_MARGIN: 0.1,
  VERSION_DC_COM_PROTOCOL: 'DC_COM_V2',
  STATE_COLORS: {
    nominal: [
      { obsolete: true, significant: true, color: '#3498db' },
      { obsolete: true, significant: false, color: '#bdc3c7' },
      { obsolete: false, significant: true, color: '#2ecc71' },
      { obsolete: false, significant: false, color: '#95a5a6' },
    ],
    warning: [
      { obsolete: true, significant: true, color: '#3498db' },
      { obsolete: true, significant: false, color: '#bdc3c7' },
      { obsolete: false, significant: true, color: '#f1c40f' },
      { obsolete: false, significant: false, color: '#95a5a6' },
    ],
    danger: [
      { obsolete: true, significant: true, color: '#3498db' },
      { obsolete: true, significant: false, color: '#bdc3c7' },
      { obsolete: false, significant: true, color: '#e67e22' },
      { obsolete: false, significant: false, color: '#95a5a6' },
    ],
    severe: [
      { obsolete: true, significant: true, color: '#3498db' },
      { obsolete: true, significant: false, color: '#bdc3c7' },
      { obsolete: false, significant: true, color: '#d35400' },
      { obsolete: false, significant: false, color: '#95a5a6' },
    ],
    critical: [
      { obsolete: true, significant: true, color: '#3498db' },
      { obsolete: true, significant: false, color: '#bdc3c7' },
      { obsolete: false, significant: true, color: '#e74c3c' },
      { obsolete: false, significant: false, color: '#95a5a6' },
    ],
    outOfRange: [
      { obsolete: true, significant: true, color: '#3498db' },
      { obsolete: true, significant: false, color: '#bdc3c7' },
      { obsolete: false, significant: true, color: '#c0392b' },
      { obsolete: false, significant: false, color: '#95a5a6' },
    ],
  },
  DEFAULT_FIELD: {
    ReportingParameter: 'extractedValue',
  },
  DOMAINS_COLORS: [
    { 'fr.cnes.isis.simupus': '#339933' },
    { 'fr.cnes.isis': '#0066ff' },
    { multi: '#ff3300' },
    { unresolved: '#CCCCCC' },
  ],
  DATE_FORMAT_TAI: 'YYYY-MM-DDTHH:mm:ss.SSS',
  PUS_CONSTANTS: {
    ENABLED_SERVICE_APIDS: {
      PUS03View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS05View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS11View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS12View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS13View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS14View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS15View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS18View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS19View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS140View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS142View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUS144View: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
      PUSMMEView: ['TIMEPACKET', 'ORBIT', 'POWERMGT'],
    },
    UPDATE_TYPE: {
      1: 'TC',
      2: 'TM',
      3: 'Default',
      4: 'Timer',
      200: '',
    },
    FUNCTIONAL_MONITORING_CHECKING_STATUS: {
      1: 'UNCHECKED',
      2: 'INVALID',
      3: 'RUNNING',
      4: 'FAILED',
    },
    SERVICE1_EVENT: {
      1: 'ACCEPT_FAIL',
      2: 'ACCEPT_SUCCESS',
      3: 'EXEC_FAIL',
      4: 'EXEC_SUCCESS',
      5: 'START_FAIL',
      6: 'START_SUCCESS',
    },
    ELEMENT_TYPE: {
      1: 'Diag Packet',
      2: 'Downlink LDT',
      3: 'Event Action',
      4: 'Event Report',
      5: 'Functional Monitoring',
      6: 'Ground Model General',
      7: 'HK Packet',
      8: 'OBCP',
      9: 'OnBoard Monitoring',
      10: 'OnBoard Partition',
      11: 'Packet Store',
      12: 'Parameter',
      13: 'SubSchedule',
      14: 'Uplink LDT',
    },
    GROUND_MODEL_TBD_TYPE: {
      1: 'PUS003Model',
      2: 'PUS005Model',
      3: 'PUS011Model',
      4: 'PUS011Command',
      5: 'PUS011SubSchedule',
      6: 'PUS011Syncpoint',
      7: 'PUS012Model',
      8: 'PUS013Model',
      9: 'PUS014Model',
      10: 'PUS015Model',
      11: 'PUS018Model',
      12: 'PUS019Model',
      13: 'PUS140Model',
      14: 'PUS142Model',
      15: 'PUS144Model',
    },
    FILE_PROTECTION_STATUS: {
      1: 'DELETE DISABLED',
      2: 'DELETE ENABLED',
    },
    FILE_MODE: {
      1: 'OPENED',
      2: 'CLOSED',
    },
    LARGE_TRANSFER_PART_STATUS: {
      1: 'TO TRANSFER',
      2: 'TRANSFERRED',
      3: 'FAILED',
      4: 'ACKNOWLEDGED',
    },
    LARGE_TRANSFER_GROUND_STATUS: {
      1: 'DOWNLOADING',
      2: 'UPLOADING',
      3: 'TO UPLOAD',
      4: 'FAILED',
      5: 'ABORTED',
      6: 'DOWNLOADED',
      7: 'UPLOADED',
    },
    COMMAND_GROUND_STATUS: {
      1: 'ACCEPTANCE SUCCESS',
      2: 'ACCEPTANCE FAILURE',
      3: 'EXECUTION SUCCESS',
      4: 'EXECUTION FAILURE',
      5: 'EXPIRED',
      6: 'TO DELETE',
      7: 'CREATED',
      8: 'SENT',
    },
    STATUS: {
      1: 'DISABLED',
      2: 'ENABLED',
      3: 'DELETED',
      200: 'UNKNOWN',
    },
    CHECK_TYPE: {
      1: 'DELTA',
      2: 'EXPECTED VALUE',
      3: 'LIMIT',
    },
    INITIALISATION_MODE: {
      1: 'FROM DEFAULT',
      2: 'FROM LAST STATE',
      3: 'FROM PREVIOUS STATE',
    },
    GENERATION_MODE: {
      1: 'PERIODIC',
      2: 'FILTERED',
    },
    TRANSFERT_TYPE: {
      1: 'FILEFILE',
      2: 'STANDARD PACKET',
    },
  },
};

set(global, 'parameters.get', path => _.get(path, global.testConfig));

// jest snapshots serializers
_.each(serializer => (
  expect.addSnapshotSerializer(serializer)
), serializers);

// jest expect.extend utils
const isNodeError = _.allPass([
  _.has('errno'),
  _.has('code'),
  _.has('syscall'),
]);
const stringify = val => JSON.stringify(val, null, 2);

const toBe = (predicat, getAssertionString = _.identity) => (received, argument) => {
  const pass = predicat(received, argument);
  const assertionString = getAssertionString(stringify(argument));
  return {
    message: () => `expected ${stringify(received)}${pass ? ' not ' : ' '}to be ${assertionString}`,
    pass,
  };
};

function toHaveKeys(val, argument = []) {
  const keys = Object.keys(val);
  const diffKeys = (this.isNot ? intersection : difference)(argument, keys);
  const pass = this.isNot ? !!diffKeys.length : !diffKeys.length;
  const assertedKeys = JSON.stringify(diffKeys);
  return {
    message: () => `expected ${stringify(val)} to have${pass ? ' not ' : ' '}${assertedKeys} keys`,
    pass,
  };
}

const v4Length = v4().length;

// jest extended assertions
const extendedAssertions = {
  toBeArray: toBe(Array.isArray, () => 'an array'),
  toBeObject: toBe(x => typeof x === 'object', () => 'an object'),
  toBeNumber: toBe(x => typeof x === 'number', () => 'a number'),
  toBeString: toBe(x => typeof x === 'string', () => 'a string'),
  toBeFunction: toBe(x => typeof x === 'function', () => 'a function'),
  toBeOneOf: toBe((val, arg = []) => arg.includes(val), arg => `one of ${arg}`),
  toBeV4: toBe(x => typeof x === 'string' && x.length === v4Length, () => 'a V4 uuid'),
  toBeHexadecimal: toBe(x => (/^#(?:[0-9a-fA-F]{3}){1,2}$/).test(x), () => 'a hexadecimal value'),
  toBeError: toBe(x =>
    x instanceof Error || isNodeError(x),
    () => 'an error'
  ),
  toHaveKeys,
};

const aliases = {
  toBeAnArray: extendedAssertions.toBeArray,
  toBeAnObject: extendedAssertions.toBeObject,
  toBeANumber: extendedAssertions.toBeNumber,
  toBeAString: extendedAssertions.toBeString,
  toBeAFunction: extendedAssertions.toBeFunction,
  toBeAnUuid: extendedAssertions.toBeV4,
  toBeAnHexadecimalValue: extendedAssertions.toBeHexadecimal,
  toBeAnError: extendedAssertions.toBeError,
};

expect.extend({
  ...extendedAssertions,
  ...aliases,
});

configure({ adapter: new Adapter() });

