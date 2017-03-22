/* eslint import/no-extraneous-dependencies:0 */
const _each = require('lodash/each');
const Long = require('long');

// disable HTTP server logs for test run
process.env.HTTP_LOGS = 0;

const chai = require('chai');
const properties = require('chai-properties');

chai.use(properties);

const testPayloads = [];

const testHandler = (...args) => {
  _each(args, (arg) => {
    testPayloads.push(arg);
  });
};

module.exports = {
  should: chai.should(),
  expect: chai.expect,
  // request,
  testHandler,
  testPayloads,
  // types
  Long,
};
