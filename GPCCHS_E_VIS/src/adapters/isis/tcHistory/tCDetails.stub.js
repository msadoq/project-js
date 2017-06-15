// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _random = require('lodash/random');
const applyOverride = require('../../../protobuf/utils/applyOverride');


module.exports = override => applyOverride({
  tcDetailType: 0,
  value: _random(1, 100, true),
  valueIsRaw: true,
  apId: 100,
  sourceId: 100,
  sequenceCount: 100,
  serviceType: 100,
  serviceSubType: 100,
  argumentIds: ['myIDENTIFIER', 'myIDENTIFIER'],
  argumentValues: [],
  rawPacket: Buffer.alloc(10, 1),
}, override);
