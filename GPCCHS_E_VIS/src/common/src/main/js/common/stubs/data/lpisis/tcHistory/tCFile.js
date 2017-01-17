// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPusHeader = require('./pusHeader');
const getTC13 = require('./tC13');

const now = _now();

module.exports = override => applyOverride({
  encodingDate: now,
  pusHeader: getPusHeader(),
  fileReference: 'mySTRING',
  partition: 'mySTRING',
  rawPacket: Buffer.alloc(10, 1),
  tc13: [getTC13(), getTC13()],
  tcId: -100,
  tcSourceId: 100,
  sequenceCount: 1000,
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
}, override);

