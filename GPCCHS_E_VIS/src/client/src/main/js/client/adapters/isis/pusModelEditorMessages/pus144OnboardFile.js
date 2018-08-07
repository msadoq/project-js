// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.encode(data.partitionId)
      : null,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? uINTEGER.encode(data.fileId)
      : null,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? sTRING.encode(data.fileType)
      : null,
    fileSize: (data.fileSize !== null && typeof data.fileSize !== 'undefined')
      ? uINTEGER.encode(data.fileSize)
      : null,
    fileCreationTime: (data.fileCreationTime !== null && typeof data.fileCreationTime !== 'undefined')
      ? sTRING.encode(data.fileCreationTime)
      : null,
    fileProtectionStatus: (data.fileProtectionStatus !== null && typeof data.fileProtectionStatus !== 'undefined')
      ? sTRING.encode(data.fileProtectionStatus)
      : null,
    fileMode: (data.fileMode !== null && typeof data.fileMode !== 'undefined')
      ? sTRING.encode(data.fileMode)
      : null,
    fileAddress: (data.fileAddress !== null && typeof data.fileAddress !== 'undefined')
      ? sTRING.encode(data.fileAddress)
      : null,
    uploadedFileChecksum: (data.uploadedFileChecksum !== null && typeof data.uploadedFileChecksum !== 'undefined')
      ? sTRING.encode(data.uploadedFileChecksum)
      : null,
    computedFileChecksum: (data.computedFileChecksum !== null && typeof data.computedFileChecksum !== 'undefined')
      ? sTRING.encode(data.computedFileChecksum)
      : null,
    isFileSizeSet: (data.isFileSizeSet !== null && typeof data.isFileSizeSet !== 'undefined')
      ? bOOLEAN.encode(data.isFileSizeSet)
      : null,
    lastUpdateModeOnBoardFileId: (data.lastUpdateModeOnBoardFileId !== null && typeof data.lastUpdateModeOnBoardFileId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeOnBoardFileId)
      : null,
    lastUpdateTimeOnBoardFileId: (data.lastUpdateTimeOnBoardFileId !== null && typeof data.lastUpdateTimeOnBoardFileId !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeOnBoardFileId)
      : null,
    lastUpdateModeFileProtectionStatus: (data.lastUpdateModeFileProtectionStatus !== null && typeof data.lastUpdateModeFileProtectionStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileProtectionStatus)
      : null,
    lastUpdateTimeFileProtectionStatus: (data.lastUpdateTimeFileProtectionStatus !== null && typeof data.lastUpdateTimeFileProtectionStatus !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFileProtectionStatus)
      : null,
    lastUpdateModeFileAddress: (data.lastUpdateModeFileAddress !== null && typeof data.lastUpdateModeFileAddress !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileAddress)
      : null,
    lastUpdateTimeFileAddress: (data.lastUpdateTimeFileAddress !== null && typeof data.lastUpdateTimeFileAddress !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFileAddress)
      : null,
    lastUpdateModeFileMode: (data.lastUpdateModeFileMode !== null && typeof data.lastUpdateModeFileMode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileMode)
      : null,
    lastUpdateTimeFileMode: (data.lastUpdateTimeFileMode !== null && typeof data.lastUpdateTimeFileMode !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFileMode)
      : null,
    lastUpdateModeFileType: (data.lastUpdateModeFileType !== null && typeof data.lastUpdateModeFileType !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileType)
      : null,
    lastUpdateTimeFileType: (data.lastUpdateTimeFileType !== null && typeof data.lastUpdateTimeFileType !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFileType)
      : null,
    lastUpdateModeFileSize: (data.lastUpdateModeFileSize !== null && typeof data.lastUpdateModeFileSize !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileSize)
      : null,
    lastUpdateTimeFileSize: (data.lastUpdateTimeFileSize !== null && typeof data.lastUpdateTimeFileSize !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFileSize)
      : null,
    lastUpdateModeUploadedChecksum: (data.lastUpdateModeUploadedChecksum !== null && typeof data.lastUpdateModeUploadedChecksum !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeUploadedChecksum)
      : null,
    lastUpdateTimeUploadedChecksum: (data.lastUpdateTimeUploadedChecksum !== null && typeof data.lastUpdateTimeUploadedChecksum !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeUploadedChecksum)
      : null,
    lastUpdateModeFileCreationTime: (data.lastUpdateModeFileCreationTime !== null && typeof data.lastUpdateModeFileCreationTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeFileCreationTime)
      : null,
    lastUpdateTimeFileCreationTime: (data.lastUpdateTimeFileCreationTime !== null && typeof data.lastUpdateTimeFileCreationTime !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeFileCreationTime)
      : null,
    lastUpdateModeComputedChecksum: (data.lastUpdateModeComputedChecksum !== null && typeof data.lastUpdateModeComputedChecksum !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeComputedChecksum)
      : null,
    lastUpdateTimeComputedChecksum: (data.lastUpdateTimeComputedChecksum !== null && typeof data.lastUpdateTimeComputedChecksum !== 'undefined')
      ? sTRING.encode(data.lastUpdateTimeComputedChecksum)
      : null,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
  }),
  decode: data => ({
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.decode(data.partitionId)
      : undefined,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? uINTEGER.decode(data.fileId)
      : undefined,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? sTRING.decode(data.fileType)
      : undefined,
    fileSize: (data.fileSize !== null && typeof data.fileSize !== 'undefined')
      ? uINTEGER.decode(data.fileSize)
      : undefined,
    fileCreationTime: (data.fileCreationTime !== null && typeof data.fileCreationTime !== 'undefined')
      ? sTRING.decode(data.fileCreationTime)
      : undefined,
    fileProtectionStatus: (data.fileProtectionStatus !== null && typeof data.fileProtectionStatus !== 'undefined')
      ? sTRING.decode(data.fileProtectionStatus)
      : undefined,
    fileMode: (data.fileMode !== null && typeof data.fileMode !== 'undefined')
      ? sTRING.decode(data.fileMode)
      : undefined,
    fileAddress: (data.fileAddress !== null && typeof data.fileAddress !== 'undefined')
      ? sTRING.decode(data.fileAddress)
      : undefined,
    uploadedFileChecksum: (data.uploadedFileChecksum !== null && typeof data.uploadedFileChecksum !== 'undefined')
      ? sTRING.decode(data.uploadedFileChecksum)
      : undefined,
    computedFileChecksum: (data.computedFileChecksum !== null && typeof data.computedFileChecksum !== 'undefined')
      ? sTRING.decode(data.computedFileChecksum)
      : undefined,
    isFileSizeSet: (data.isFileSizeSet !== null && typeof data.isFileSizeSet !== 'undefined')
      ? bOOLEAN.decode(data.isFileSizeSet)
      : undefined,
    lastUpdateModeOnBoardFileId: (data.lastUpdateModeOnBoardFileId !== null && typeof data.lastUpdateModeOnBoardFileId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeOnBoardFileId)
      : undefined,
    lastUpdateTimeOnBoardFileId: (data.lastUpdateTimeOnBoardFileId !== null && typeof data.lastUpdateTimeOnBoardFileId !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeOnBoardFileId)
      : undefined,
    lastUpdateModeFileProtectionStatus: (data.lastUpdateModeFileProtectionStatus !== null && typeof data.lastUpdateModeFileProtectionStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileProtectionStatus)
      : undefined,
    lastUpdateTimeFileProtectionStatus: (data.lastUpdateTimeFileProtectionStatus !== null && typeof data.lastUpdateTimeFileProtectionStatus !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFileProtectionStatus)
      : undefined,
    lastUpdateModeFileAddress: (data.lastUpdateModeFileAddress !== null && typeof data.lastUpdateModeFileAddress !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileAddress)
      : undefined,
    lastUpdateTimeFileAddress: (data.lastUpdateTimeFileAddress !== null && typeof data.lastUpdateTimeFileAddress !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFileAddress)
      : undefined,
    lastUpdateModeFileMode: (data.lastUpdateModeFileMode !== null && typeof data.lastUpdateModeFileMode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileMode)
      : undefined,
    lastUpdateTimeFileMode: (data.lastUpdateTimeFileMode !== null && typeof data.lastUpdateTimeFileMode !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFileMode)
      : undefined,
    lastUpdateModeFileType: (data.lastUpdateModeFileType !== null && typeof data.lastUpdateModeFileType !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileType)
      : undefined,
    lastUpdateTimeFileType: (data.lastUpdateTimeFileType !== null && typeof data.lastUpdateTimeFileType !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFileType)
      : undefined,
    lastUpdateModeFileSize: (data.lastUpdateModeFileSize !== null && typeof data.lastUpdateModeFileSize !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileSize)
      : undefined,
    lastUpdateTimeFileSize: (data.lastUpdateTimeFileSize !== null && typeof data.lastUpdateTimeFileSize !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFileSize)
      : undefined,
    lastUpdateModeUploadedChecksum: (data.lastUpdateModeUploadedChecksum !== null && typeof data.lastUpdateModeUploadedChecksum !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeUploadedChecksum)
      : undefined,
    lastUpdateTimeUploadedChecksum: (data.lastUpdateTimeUploadedChecksum !== null && typeof data.lastUpdateTimeUploadedChecksum !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeUploadedChecksum)
      : undefined,
    lastUpdateModeFileCreationTime: (data.lastUpdateModeFileCreationTime !== null && typeof data.lastUpdateModeFileCreationTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeFileCreationTime)
      : undefined,
    lastUpdateTimeFileCreationTime: (data.lastUpdateTimeFileCreationTime !== null && typeof data.lastUpdateTimeFileCreationTime !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeFileCreationTime)
      : undefined,
    lastUpdateModeComputedChecksum: (data.lastUpdateModeComputedChecksum !== null && typeof data.lastUpdateModeComputedChecksum !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeComputedChecksum)
      : undefined,
    lastUpdateTimeComputedChecksum: (data.lastUpdateTimeComputedChecksum !== null && typeof data.lastUpdateTimeComputedChecksum !== 'undefined')
      ? sTRING.decode(data.lastUpdateTimeComputedChecksum)
      : undefined,
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
  }),
};
