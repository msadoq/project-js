// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../applyOverride');
const getPusHeader = require('./pusHeader.stub');
const getTC13 = require('./tC13.stub');

const now = _now();

module.exports = override => applyOverride({
  encodingDate: now,
  pusHeader: getPusHeader(),
  tc13: [getTC13(), getTC13()],
  rawPacket: Buffer.alloc(10, 1),
  generatedProcedure: 'mySTRING',
  tcId: -100,
  tcSourceId: 100,
  sequenceCount: 1000,
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
}, override);
