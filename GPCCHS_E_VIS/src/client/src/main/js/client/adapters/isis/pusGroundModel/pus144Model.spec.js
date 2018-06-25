// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus144Model');
const stub = require('./pus144Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus144Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus144Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus144Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      noOfOnBoardFiles: { type: 'uinteger', value: stub.noOfOnBoardFiles },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uoctet', value: stub.status },
    });
    expect(decoded.pus144OnboardFiles).toHaveLength(stub.pus144OnboardFiles.length);
    for (let i = 0; i < stub.pus144OnboardFiles.length; i += 1) {
      expect(decoded.pus144OnboardFiles[i]).toMatchObject({
        partitionId: { type: 'string', value: stub.pus144OnboardFiles[i].partitionId },
        fileProtectionStatus: { type: 'string', value: stub.pus144OnboardFiles[i].fileProtectionStatus },
        fileId: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileId },
        fileAddress: { type: 'string', value: stub.pus144OnboardFiles[i].fileAddress },
        fileSize: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileSize },
        uploadedFileChecksum: { type: 'string', value: stub.pus144OnboardFiles[i].uploadedFileChecksum },
        fileType: { type: 'string', value: stub.pus144OnboardFiles[i].fileType },
        fileMode: { type: 'string', value: stub.pus144OnboardFiles[i].fileMode },
        fileCreationTime: { type: 'time', value: stub.pus144OnboardFiles[i].fileCreationTime },
        computedFileChecksum: { type: 'string', value: stub.pus144OnboardFiles[i].computedFileChecksum },
        pusElement: {
          lastUpdateMode: { type: 'uoctet', value: stub.pus144OnboardFiles[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus144OnboardFiles[i].pusElement.lastUpdateTime },
        },
        isFileSizeSet: { type: 'boolean', value: stub.pus144OnboardFiles[i].isFileSizeSet },
        lastUpdateModeOnBoardFileId: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeOnBoardFileId },
        lastUpdateTimeOnBoardFileId: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeOnBoardFileId },
        lastUpdateModeFileProtectionStatus: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeFileProtectionStatus },
        lastUpdateTimeFileProtectionStatus: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileProtectionStatus },
        lastUpdateModeFileAddress: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeFileAddress },
        lastUpdateTimeFileAddress: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileAddress },
        lastUpdateModeFileMode: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeFileMode },
        lastUpdateTimeFileMode: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileMode },
        lastUpdateModeFileType: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeFileType },
        lastUpdateTimeFileType: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileType },
        lastUpdateModeFileSize: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeFileSize },
        lastUpdateTimeFileSize: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileSize },
        lastUpdateModeUploadedChecksum: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeUploadedChecksum },
        lastUpdateTimeUploadedChecksum: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeUploadedChecksum },
        lastUpdateModeFileCreationTime: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeFileCreationTime },
        lastUpdateTimeFileCreationTime: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileCreationTime },
        lastUpdateModeComputedChecksum: { type: 'uoctet', value: stub.pus144OnboardFiles[i].lastUpdateModeComputedChecksum },
        lastUpdateTimeComputedChecksum: { type: 'time', value: stub.pus144OnboardFiles[i].lastUpdateTimeComputedChecksum },
      });
      
    }
  });
});
