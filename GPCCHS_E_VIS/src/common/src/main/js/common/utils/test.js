// eslint-disable-next-line no-underscore-dangle
const _each = require('lodash/each');

// disable HTTP server logs for test run
process.env.HTTP_LOGS = 0;

const chai = require('chai'); // eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const properties = require('chai-properties');
// const request = require('supertest'); // eslint-disable-line import/no-extraneous-dependencies


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
};
