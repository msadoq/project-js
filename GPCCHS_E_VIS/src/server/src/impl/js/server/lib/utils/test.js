const _each = require('lodash/each');
const chai = require('chai');
const properties = require('chai-properties');
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
const e2eUrl = () => `${process.env.E2E_URL}:${process.env.SERVER_PORT}?identity=main`;

module.exports = {
  should: chai.should(),
  expressApp,
  database,
  testHandler,
  getTestHandlerArgs: () => testHandlerArgs,
  resetTestHandlerArgs: () => { testHandlerArgs = []; },
  e2eUrl,
};
