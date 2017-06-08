import _ from 'lodash';
import { difference, intersection } from 'lodash/fp';
import { v4 } from 'uuid';
import path from 'path';

/*
  Setting up the testing framework before each test.
  Please see : https://facebook.github.io/jest/docs/cli.html#setuptestframeworkscriptfile-file
*/

global.testConfig = {
  ISIS_DOCUMENTS_ROOT: path.resolve(__dirname, '../documentManager/fixtures'),
  WILDCARD_CHARACTER: '*',
  VISUWINDOW_MAX_LENGTH: 42,
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

_.set(
  global,
  'parameters.get',
  p => _.get(global.testConfig, p)
);

// jest expect.extend utils
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
  toBeOneOf: toBe((val, arg = []) => arg.includes(val), arg => `one of ${arg}`),
  toBeV4: toBe(x => typeof x === 'string' && x.length === v4Length, () => 'a V4 uuid'),
  toHaveKeys,
};

const aliases = {
  toBeAnArray: extendedAssertions.toBeArray,
  toBeAnObject: extendedAssertions.toBeObject,
  toBeAString: extendedAssertions.toBeString,
  toBeAnUuid: extendedAssertions.toBeV4,
};

expect.extend({
  ...extendedAssertions,
  ...aliases,
});
