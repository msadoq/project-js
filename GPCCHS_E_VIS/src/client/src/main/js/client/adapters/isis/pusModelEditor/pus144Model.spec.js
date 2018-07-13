// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus144Model');
const stub = require('./pus144Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus144Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus144Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus144Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      groundDate: { type: 'time', value: stub.groundDate },
      status: { type: 'uinteger', value: stub.status },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
    });
    expect(decoded.pus144OnboardFiles).toHaveLength(stub.pus144OnboardFiles.length);
    for (let i = 0; i < stub.pus144OnboardFiles.length; i += 1) {
      expect(decoded.pus144OnboardFiles[i]).toMatchObject({
        partitionId: { type: 'string', value: stub.pus144OnboardFiles[i].partitionId },
        fileId: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileId },
        fileType: { type: 'string', value: stub.pus144OnboardFiles[i].fileType },
        fileSize: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileSize },
        fileCreationTime: { type: 'string', value: stub.pus144OnboardFiles[i].fileCreationTime },
        fileProtectionStatus: { type: 'string', value: stub.pus144OnboardFiles[i].fileProtectionStatus },
        fileMode: { type: 'string', value: stub.pus144OnboardFiles[i].fileMode },
        fileAddress: { type: 'string', value: stub.pus144OnboardFiles[i].fileAddress },
        uploadedFileChecksum: { type: 'string', value: stub.pus144OnboardFiles[i].uploadedFileChecksum },
        computedFileChecksum: { type: 'string', value: stub.pus144OnboardFiles[i].computedFileChecksum },
        isFileSizeSet: { type: 'boolean', value: stub.pus144OnboardFiles[i].isFileSizeSet },
        lastUpdateModeOnBoardFileId: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeOnBoardFileId },
        lastUpdateTimeOnBoardFileId: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeOnBoardFileId },
        lastUpdateModeFileProtectionStatus: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeFileProtectionStatus },
        lastUpdateTimeFileProtectionStatus: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileProtectionStatus },
        lastUpdateModeFileAddress: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeFileAddress },
        lastUpdateTimeFileAddress: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileAddress },
        lastUpdateModeFileMode: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeFileMode },
        lastUpdateTimeFileMode: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileMode },
        lastUpdateModeFileType: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeFileType },
        lastUpdateTimeFileType: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileType },
        lastUpdateModeFileSize: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeFileSize },
        lastUpdateTimeFileSize: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileSize },
        lastUpdateModeUploadedChecksum: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeUploadedChecksum },
        lastUpdateTimeUploadedChecksum: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeUploadedChecksum },
        lastUpdateModeFileCreationTime: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeFileCreationTime },
        lastUpdateTimeFileCreationTime: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeFileCreationTime },
        lastUpdateModeComputedChecksum: { type: 'uinteger', value: stub.pus144OnboardFiles[i].lastUpdateModeComputedChecksum },
        lastUpdateTimeComputedChecksum: { type: 'string', value: stub.pus144OnboardFiles[i].lastUpdateTimeComputedChecksum },
        uniqueId: { type: 'ulong', symbol: `${stub.pus144OnboardFiles[i].uniqueId}` },
        serviceApid: { type: 'uinteger', value: stub.pus144OnboardFiles[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus144OnboardFiles[i].serviceApidName },
      });
      
    }
  });
});
