// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const pusParameter = {
  parameterId: 100,
  parameterName: 'mySTRING',
  value: _random(1, 100, true),
  pusElement: getPusElement(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pusParameter) : pusParameter);
