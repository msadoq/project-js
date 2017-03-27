// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  partitionId: 100,
  fileProtectionStatus: 100,
  fileId: 100,
  fileAddress: 100,
  fileSize: 100,
  uploadedFileChecksum: 100,
  fileType: 'mySTRING',
  fileMode: 100,
  fileCreationTime: now,
  computedFileChecksum: 100,
  pusElement: getPusElement(),
}, override);

