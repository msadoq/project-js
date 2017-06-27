// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const pus003Packet = {
  sid: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: _random(1, 100, true),
  collectionInterval: 42.5,
  status: 100,
  pusElement: getPusElement(),
  sidLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003Packet) : pus003Packet);
