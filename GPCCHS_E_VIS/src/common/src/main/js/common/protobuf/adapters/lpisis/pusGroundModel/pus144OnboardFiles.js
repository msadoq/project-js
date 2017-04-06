// Produced by Acceleo JavaScript Generator 1.1.0
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? { value: data.partitionId }
      : null,
    fileProtectionStatus: (data.fileProtectionStatus !== null && typeof data.fileProtectionStatus !== 'undefined')
      ? { value: data.fileProtectionStatus }
      : null,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? { value: data.fileId }
      : null,
    fileAddress: (data.fileAddress !== null && typeof data.fileAddress !== 'undefined')
      ? { value: data.fileAddress }
      : null,
    fileSize: (data.fileSize !== null && typeof data.fileSize !== 'undefined')
      ? { value: data.fileSize }
      : null,
    uploadedFileChecksum: (data.uploadedFileChecksum !== null && typeof data.uploadedFileChecksum !== 'undefined')
      ? { value: data.uploadedFileChecksum }
      : null,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? { value: data.fileType }
      : null,
    fileMode: (data.fileMode !== null && typeof data.fileMode !== 'undefined')
      ? { value: data.fileMode }
      : null,
    fileCreationTime: (data.fileCreationTime !== null && typeof data.fileCreationTime !== 'undefined')
      ? { value: data.fileCreationTime }
      : null,
    computedFileChecksum: (data.computedFileChecksum !== null && typeof data.computedFileChecksum !== 'undefined')
      ? { value: data.computedFileChecksum }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
  }),
  decode: data => ({
    partitionId: (data.partitionId !== null && typeof data.partitionId !== 'undefined')
      ? { type: 'uinteger', value: data.partitionId.value }
      : undefined,
    fileProtectionStatus: (data.fileProtectionStatus !== null && typeof data.fileProtectionStatus !== 'undefined')
      ? { type: 'uinteger', value: data.fileProtectionStatus.value }
      : undefined,
    fileId: (data.fileId !== null && typeof data.fileId !== 'undefined')
      ? { type: 'uinteger', value: data.fileId.value }
      : undefined,
    fileAddress: (data.fileAddress !== null && typeof data.fileAddress !== 'undefined')
      ? { type: 'uinteger', value: data.fileAddress.value }
      : undefined,
    fileSize: (data.fileSize !== null && typeof data.fileSize !== 'undefined')
      ? { type: 'uinteger', value: data.fileSize.value }
      : undefined,
    uploadedFileChecksum: (data.uploadedFileChecksum !== null && typeof data.uploadedFileChecksum !== 'undefined')
      ? { type: 'uinteger', value: data.uploadedFileChecksum.value }
      : undefined,
    fileType: (data.fileType !== null && typeof data.fileType !== 'undefined')
      ? { type: 'string', value: data.fileType.value }
      : undefined,
    fileMode: (data.fileMode !== null && typeof data.fileMode !== 'undefined')
      ? { type: 'uinteger', value: data.fileMode.value }
      : undefined,
    fileCreationTime: (data.fileCreationTime !== null && typeof data.fileCreationTime !== 'undefined')
      ? { type: 'time', value: data.fileCreationTime.value.toNumber() }
      : undefined,
    computedFileChecksum: (data.computedFileChecksum !== null && typeof data.computedFileChecksum !== 'undefined')
      ? { type: 'uinteger', value: data.computedFileChecksum.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
  }),
};

