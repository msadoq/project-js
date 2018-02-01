// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusHeader = require('./pusHeader.stub');

const now = _now();

const tCFile = {
  encodingDate: now,
  pusHeader: getPusHeader(),
  fileReference: 'mySTRING',
  rawPacket: Buffer.alloc(4, 1),
  partition: 'mySTRING',
  tcId: -100,
  tc13: [Buffer.alloc(4, 1), Buffer.alloc(4, 1)],
  tcSourceId: 100,
  generatedProcedure: 'mySTRING',
  sequenceCount: 1000,
  fileUri: 'mySTRING',
  fileType: 'mySTRING',
  parameterPhysicalValue: ['mySTRING', 'mySTRING'],
  fileChecksum: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, tCFile) : tCFile);
