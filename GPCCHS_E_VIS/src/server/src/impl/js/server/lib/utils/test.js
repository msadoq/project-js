/* eslint no-underscore-dangle:0 import/no-extraneous-dependencies:0 */
require('dotenv-safe').load();
const _each = require('lodash/each');
const chai = require('chai');
const properties = require('chai-properties');
const utils = require('util');
const expressApp = require('../express');
const database = require('../io/loki');

chai.use(properties);

let testHandlerArgs = [];

const testHandler = (...args) => {
  _each(args, (arg) => {
    testHandlerArgs.push(arg);
  });
};

// URL used into e2e tests for WS connection with HSS
const e2eUrl = () => `${process.env.E2E_URL}:${process.env.PORT}?identity=main`;

// eslint-disable-next-line no-console
const deepLog = obj => console.log(utils.inspect(obj, false, null));

module.exports = {
  should: chai.should(),
  expressApp,
  database,
  testHandler,
  getTestHandlerArgs: () => testHandlerArgs,
  resetTestHandlerArgs: () => { testHandlerArgs = []; },
  e2eUrl,
  deepLog,
};
