// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus144OnboardFiles = {
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
};

module.exports = override => (override ? _defaultsDeep({}, override, pus144OnboardFiles) : pus144OnboardFiles);
