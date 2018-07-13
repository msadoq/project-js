// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus144OnboardFile');
const stub = require('./pus144OnboardFile.stub')();



describe('protobuf/isis/pusModelEditor/Pus144OnboardFile', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus144OnboardFile.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus144OnboardFile');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      partitionId: { type: 'string', value: stub.partitionId },
      fileId: { type: 'uinteger', value: stub.fileId },
      fileType: { type: 'string', value: stub.fileType },
      fileSize: { type: 'uinteger', value: stub.fileSize },
      fileCreationTime: { type: 'string', value: stub.fileCreationTime },
      fileProtectionStatus: { type: 'string', value: stub.fileProtectionStatus },
      fileMode: { type: 'string', value: stub.fileMode },
      fileAddress: { type: 'string', value: stub.fileAddress },
      uploadedFileChecksum: { type: 'string', value: stub.uploadedFileChecksum },
      computedFileChecksum: { type: 'string', value: stub.computedFileChecksum },
      isFileSizeSet: { type: 'boolean', value: stub.isFileSizeSet },
      lastUpdateModeOnBoardFileId: { type: 'uinteger', value: stub.lastUpdateModeOnBoardFileId },
      lastUpdateTimeOnBoardFileId: { type: 'string', value: stub.lastUpdateTimeOnBoardFileId },
      lastUpdateModeFileProtectionStatus: { type: 'uinteger', value: stub.lastUpdateModeFileProtectionStatus },
      lastUpdateTimeFileProtectionStatus: { type: 'string', value: stub.lastUpdateTimeFileProtectionStatus },
      lastUpdateModeFileAddress: { type: 'uinteger', value: stub.lastUpdateModeFileAddress },
      lastUpdateTimeFileAddress: { type: 'string', value: stub.lastUpdateTimeFileAddress },
      lastUpdateModeFileMode: { type: 'uinteger', value: stub.lastUpdateModeFileMode },
      lastUpdateTimeFileMode: { type: 'string', value: stub.lastUpdateTimeFileMode },
      lastUpdateModeFileType: { type: 'uinteger', value: stub.lastUpdateModeFileType },
      lastUpdateTimeFileType: { type: 'string', value: stub.lastUpdateTimeFileType },
      lastUpdateModeFileSize: { type: 'uinteger', value: stub.lastUpdateModeFileSize },
      lastUpdateTimeFileSize: { type: 'string', value: stub.lastUpdateTimeFileSize },
      lastUpdateModeUploadedChecksum: { type: 'uinteger', value: stub.lastUpdateModeUploadedChecksum },
      lastUpdateTimeUploadedChecksum: { type: 'string', value: stub.lastUpdateTimeUploadedChecksum },
      lastUpdateModeFileCreationTime: { type: 'uinteger', value: stub.lastUpdateModeFileCreationTime },
      lastUpdateTimeFileCreationTime: { type: 'string', value: stub.lastUpdateTimeFileCreationTime },
      lastUpdateModeComputedChecksum: { type: 'uinteger', value: stub.lastUpdateModeComputedChecksum },
      lastUpdateTimeComputedChecksum: { type: 'string', value: stub.lastUpdateTimeComputedChecksum },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
    });
    
  });
});
