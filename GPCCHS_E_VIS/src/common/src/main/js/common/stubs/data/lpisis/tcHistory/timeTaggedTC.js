// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPusHeader = require('./pusHeader');

const now = _now();

module.exports = override => applyOverride({
  encodingDate: now,
  pusHeader: getPusHeader(),
  date: now,
  rawPacket: Buffer.alloc(10, 1),
  tcId: -100,
  tcSourceId: 100,
  sequenceCount: 1000,
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
}, override);

