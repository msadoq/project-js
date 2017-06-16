// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../applyOverride');
const getPusHeader = require('./pusHeader.stub');
const getTimeTaggedTC = require('./timeTaggedTC.stub');

const now = _now();

module.exports = override => applyOverride({
  encodingDate: now,
  pusHeader: getPusHeader(),
  timeTaggedTC: [getTimeTaggedTC(), getTimeTaggedTC()],
  rawPacket: Buffer.alloc(10, 1),
  subscheduleId: 100,
  tcId: -100,
  tcSourceId: 100,
  sequenceCount: 1000,
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
}, override);
