// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus144OnboardFiles = {
  partitionId: 'mySTRING',
  fileProtectionStatus: 'mySTRING',
  fileId: 100,
  fileAddress: 'mySTRING',
  fileSize: 100,
  uploadedFileChecksum: 'mySTRING',
  fileType: 'mySTRING',
  fileMode: 'mySTRING',
  fileCreationTime: now,
  computedFileChecksum: 'mySTRING',
  pusElement: getPusElement(),
  isFileSizeSet: true,
  lastUpdateModeOnBoardFileId: 100,
  lastUpdateTimeOnBoardFileId: now,
  lastUpdateModeFileProtectionStatus: 100,
  lastUpdateTimeFileProtectionStatus: now,
  lastUpdateModeFileAddress: 100,
  lastUpdateTimeFileAddress: now,
  lastUpdateModeFileMode: 100,
  lastUpdateTimeFileMode: now,
  lastUpdateModeFileType: 100,
  lastUpdateTimeFileType: now,
  lastUpdateModeFileSize: 100,
  lastUpdateTimeFileSize: now,
  lastUpdateModeUploadedChecksum: 100,
  lastUpdateTimeUploadedChecksum: now,
  lastUpdateModeFileCreationTime: 100,
  lastUpdateTimeFileCreationTime: now,
  lastUpdateModeComputedChecksum: 100,
  lastUpdateTimeComputedChecksum: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus144OnboardFiles) : pus144OnboardFiles);
