import 'babel-polyfill';
import { set } from 'lodash';
import _, { difference, intersection } from 'lodash/fp';
import { v4 } from 'uuid';
import { resolve } from 'path';

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
  STATE_COLORS: {
    alarm: 'orangered',
    critical: 'red',
    info: 'white',
    outOfRange: 'grey',
    severe: 'darkred',
    warning: 'orange',
    nonsignificant: 'lightgrey',
    obsolete: 'tan',
  },
  DEFAULT_FIELD: {},
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
