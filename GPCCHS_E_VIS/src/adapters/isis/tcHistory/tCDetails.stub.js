// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');


const tCDetails = {
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
  rawPacket: Buffer.alloc(4, 1),
};

module.exports = override => (override ? _defaultsDeep({}, override, tCDetails) : tCDetails);
