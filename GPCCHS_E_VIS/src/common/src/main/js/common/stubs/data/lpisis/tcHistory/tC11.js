// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPusHeader = require('./pusHeader');
const getTimeTaggedTC = require('./timeTaggedTC');

const now = _now();

module.exports = override => applyOverride({
  encodingDate: now,
  pusHeader: getPusHeader(),
  timeTaggedTC: [getTimeTaggedTC(), getTimeTaggedTC()],
  subscheduleId: 100,
  rawPacket: Buffer.alloc(10, 1),
  tcId: -100,
  tcSourceId: 100,
  sequenceCount: 1000,
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
}, override);

