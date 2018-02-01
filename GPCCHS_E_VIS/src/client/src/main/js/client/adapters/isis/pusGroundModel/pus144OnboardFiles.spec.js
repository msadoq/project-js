// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
      partitionId: { type: 'uinteger', value: stub.partitionId },
      fileProtectionStatus: { type: 'uinteger', value: stub.fileProtectionStatus },
      fileId: { type: 'uinteger', value: stub.fileId },
      fileAddress: { type: 'uinteger', value: stub.fileAddress },
      fileSize: { type: 'uinteger', value: stub.fileSize },
      uploadedFileChecksum: { type: 'uinteger', value: stub.uploadedFileChecksum },
      fileType: { type: 'string', value: stub.fileType },
      fileMode: { type: 'uinteger', value: stub.fileMode },
      fileCreationTime: { type: 'time', value: stub.fileCreationTime },
      computedFileChecksum: { type: 'uinteger', value: stub.computedFileChecksum },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
    });
    
  });
});
