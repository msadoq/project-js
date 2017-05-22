const _each = require('lodash/each');
// eslint-disable-next-line import/no-extraneous-dependencies, "DV6 TBC_CNES Only used by UT files"
const chai = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies, "DV6 TBC_CNES Only used by UT files"
const properties = require('chai-properties');
const database = require('../models/loki');

require('common/protobuf/adapters/dc');
require('common/protobuf/adapters/lpisis');

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
  database,
  testHandler,
  getTestHandlerArgs: () => testHandlerArgs,
  resetTestHandlerArgs: () => { testHandlerArgs = []; },
  e2eUrl,
};
