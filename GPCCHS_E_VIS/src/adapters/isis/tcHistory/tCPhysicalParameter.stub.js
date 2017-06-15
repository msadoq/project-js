// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _random = require('lodash/random');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getPusHeader = require('./pusHeader.stub');

module.exports = override => applyOverride({
  argumentIdentifier: 'myIDENTIFIER',
  value: _random(1, 100, true),
  valueIsRaw: true,
  tcDetailsType: 0,
  pusHeader: getPusHeader(),
  rawPacket: Buffer.alloc(10, 1),
  tcPhysicalParameter: [],
}, override);
