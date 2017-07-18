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
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus144OnboardFiles).toHaveLength(stub.pus144OnboardFiles.length);
    for (let i = 0; i < stub.pus144OnboardFiles.length; i += 1) {
      expect(decoded.pus144OnboardFiles[i]).toMatchObject({
        partitionId: { type: 'uinteger', value: stub.pus144OnboardFiles[i].partitionId },
        fileProtectionStatus: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileProtectionStatus },
        fileId: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileId },
        fileAddress: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileAddress },
        fileSize: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileSize },
        uploadedFileChecksum: { type: 'uinteger', value: stub.pus144OnboardFiles[i].uploadedFileChecksum },
        fileType: { type: 'string', value: stub.pus144OnboardFiles[i].fileType },
        fileMode: { type: 'uinteger', value: stub.pus144OnboardFiles[i].fileMode },
        fileCreationTime: { type: 'time', value: stub.pus144OnboardFiles[i].fileCreationTime },
        computedFileChecksum: { type: 'uinteger', value: stub.pus144OnboardFiles[i].computedFileChecksum },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus144OnboardFiles[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus144OnboardFiles[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
