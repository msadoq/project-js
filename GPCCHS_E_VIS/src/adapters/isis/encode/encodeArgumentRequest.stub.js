// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');


const encodeArgumentRequest = {
  definitionId: -1000,
  engValue: _random(1, 100, true),
  bitLength: 100,
  newEncodingFormat: 'mySTRING',
  newRawValueType: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, encodeArgumentRequest) : encodeArgumentRequest);
