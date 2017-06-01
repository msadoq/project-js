const path = require('path');
const _each = require('lodash/each');
// eslint-disable-next-line import/no-extraneous-dependencies, "DV6 TBC_CNES Only used by UT files"
const Long = require('long');
// eslint-disable-next-line import/no-extraneous-dependencies, "DV6 TBC_CNES Only used by UT files"
const chai = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies, "DV6 TBC_CNES Only used by UT files"
const properties = require('chai-properties');

const registerDc = require('../protobuf/adapters/dc');
const registerLpisis = require('../protobuf/adapters/lpisis');

let registered = false;
if (!registered) {
  registerDc(path.resolve(__dirname, '../protobuf/proto/dc')); // Temporary fix for packaging
  registerLpisis(path.resolve(__dirname, '../protobuf/proto/lpisis')); // Temporary fix for packaging
  registered = true;
}

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
