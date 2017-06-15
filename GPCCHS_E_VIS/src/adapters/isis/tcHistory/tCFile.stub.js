// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getPusHeader = require('./pusHeader.stub');
const getTC13 = require('./tC13.stub');

const now = _now();

module.exports = override => applyOverride({
  encodingDate: now,
  fileReference: 'mySTRING',
  pusHeader: getPusHeader(),
  rawPacket: Buffer.alloc(10, 1),
  partition: 'mySTRING',
  tc13: [getTC13(), getTC13()],
  tcId: -100,
  generatedProcedure: 'mySTRING',
  tcSourceId: 100,
  fileUri: 'mySTRING',
  sequenceCount: 1000,
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
  fileType: 'mySTRING',
  fileChecksum: 1000,
}, override);
