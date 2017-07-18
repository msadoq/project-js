// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusHeader = require('./pusHeader.stub');

const tCPhysicalParameter = {
  argumentIdentifier: 'myIDENTIFIER',
  value: _random(1, 100, true),
  valueIsRaw: true,
  tcDetailsType: 0,
  pusHeader: getPusHeader(),
  rawPacket: Buffer.alloc(4, 1),
  tcPhysicalParameter: [],
};

module.exports = override => (override ? _defaultsDeep({}, override, tCPhysicalParameter) : tCPhysicalParameter);
