// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus144OnboardFiles');
const stub = require('./pus144OnboardFiles.stub')();



describe('protobuf/isis/pusGroundModel/Pus144OnboardFiles', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus144OnboardFiles.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus144OnboardFiles');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      partitionId: { type: 'string', value: stub.partitionId },
      fileProtectionStatus: { type: 'string', value: stub.fileProtectionStatus },
      fileId: { type: 'uinteger', value: stub.fileId },
      fileAddress: { type: 'string', value: stub.fileAddress },
      fileSize: { type: 'uinteger', value: stub.fileSize },
      uploadedFileChecksum: { type: 'string', value: stub.uploadedFileChecksum },
      fileType: { type: 'string', value: stub.fileType },
      fileMode: { type: 'string', value: stub.fileMode },
      fileCreationTime: { type: 'time', value: stub.fileCreationTime },
      computedFileChecksum: { type: 'string', value: stub.computedFileChecksum },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      isFileSizeSet: { type: 'boolean', value: stub.isFileSizeSet },
      lastUpdateModeOnBoardFileId: { type: 'uoctet', value: stub.lastUpdateModeOnBoardFileId },
      lastUpdateTimeOnBoardFileId: { type: 'time', value: stub.lastUpdateTimeOnBoardFileId },
      lastUpdateModeFileProtectionStatus: { type: 'uoctet', value: stub.lastUpdateModeFileProtectionStatus },
      lastUpdateTimeFileProtectionStatus: { type: 'time', value: stub.lastUpdateTimeFileProtectionStatus },
      lastUpdateModeFileAddress: { type: 'uoctet', value: stub.lastUpdateModeFileAddress },
      lastUpdateTimeFileAddress: { type: 'time', value: stub.lastUpdateTimeFileAddress },
      lastUpdateModeFileMode: { type: 'uoctet', value: stub.lastUpdateModeFileMode },
      lastUpdateTimeFileMode: { type: 'time', value: stub.lastUpdateTimeFileMode },
      lastUpdateModeFileType: { type: 'uoctet', value: stub.lastUpdateModeFileType },
      lastUpdateTimeFileType: { type: 'time', value: stub.lastUpdateTimeFileType },
      lastUpdateModeFileSize: { type: 'uoctet', value: stub.lastUpdateModeFileSize },
      lastUpdateTimeFileSize: { type: 'time', value: stub.lastUpdateTimeFileSize },
      lastUpdateModeUploadedChecksum: { type: 'uoctet', value: stub.lastUpdateModeUploadedChecksum },
      lastUpdateTimeUploadedChecksum: { type: 'time', value: stub.lastUpdateTimeUploadedChecksum },
      lastUpdateModeFileCreationTime: { type: 'uoctet', value: stub.lastUpdateModeFileCreationTime },
      lastUpdateTimeFileCreationTime: { type: 'time', value: stub.lastUpdateTimeFileCreationTime },
      lastUpdateModeComputedChecksum: { type: 'uoctet', value: stub.lastUpdateModeComputedChecksum },
      lastUpdateTimeComputedChecksum: { type: 'time', value: stub.lastUpdateTimeComputedChecksum },
    });
    
  });
});
