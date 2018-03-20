// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.encode(data.partitionId)
      : null,
    fileProtectionStatus: (data.fileProtectionStatus !== null && typeof data.fileProtectionStatus !== 'undefined')
      ? sTRING.encode(data.fileProtectionStatus)
      : null,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? uINTEGER.encode(data.fileId)
      : null,
    fileAddress: (data.fileAddress !== null && typeof data.fileAddress !== 'undefined')
      ? sTRING.encode(data.fileAddress)
      : null,
    fileSize: (data.fileSize !== null && typeof data.fileSize !== 'undefined')
      ? uINTEGER.encode(data.fileSize)
      : null,
    uploadedFileChecksum: (data.uploadedFileChecksum !== null && typeof data.uploadedFileChecksum !== 'undefined')
      ? sTRING.encode(data.uploadedFileChecksum)
      : null,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? sTRING.encode(data.fileType)
      : null,
    fileMode: (data.fileMode !== null && typeof data.fileMode !== 'undefined')
      ? sTRING.encode(data.fileMode)
      : null,
    fileCreationTime: (data.fileCreationTime !== null && typeof data.fileCreationTime !== 'undefined')
      ? tIME.encode(data.fileCreationTime)
      : null,
    computedFileChecksum: (data.computedFileChecksum !== null && typeof data.computedFileChecksum !== 'undefined')
      ? sTRING.encode(data.computedFileChecksum)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    isFileSizeSet: (data.isFileSizeSet !== null && typeof data.isFileSizeSet !== 'undefined')
      ? bOOLEAN.encode(data.isFileSizeSet)
      : null,
  }),
  decode: data => ({
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? sTRING.decode(data.partitionId)
      : undefined,
    fileProtectionStatus: (data.fileProtectionStatus !== null && typeof data.fileProtectionStatus !== 'undefined')
      ? sTRING.decode(data.fileProtectionStatus)
      : undefined,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? uINTEGER.decode(data.fileId)
      : undefined,
    fileAddress: (data.fileAddress !== null && typeof data.fileAddress !== 'undefined')
      ? sTRING.decode(data.fileAddress)
      : undefined,
    fileSize: (data.fileSize !== null && typeof data.fileSize !== 'undefined')
      ? uINTEGER.decode(data.fileSize)
      : undefined,
    uploadedFileChecksum: (data.uploadedFileChecksum !== null && typeof data.uploadedFileChecksum !== 'undefined')
      ? sTRING.decode(data.uploadedFileChecksum)
      : undefined,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? sTRING.decode(data.fileType)
      : undefined,
    fileMode: (data.fileMode !== null && typeof data.fileMode !== 'undefined')
      ? sTRING.decode(data.fileMode)
      : undefined,
    fileCreationTime: (data.fileCreationTime !== null && typeof data.fileCreationTime !== 'undefined')
      ? tIME.decode(data.fileCreationTime)
      : undefined,
    computedFileChecksum: (data.computedFileChecksum !== null && typeof data.computedFileChecksum !== 'undefined')
      ? sTRING.decode(data.computedFileChecksum)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    isFileSizeSet: (data.isFileSizeSet !== null && typeof data.isFileSizeSet !== 'undefined')
      ? bOOLEAN.decode(data.isFileSizeSet)
      : undefined,
  }),
};
