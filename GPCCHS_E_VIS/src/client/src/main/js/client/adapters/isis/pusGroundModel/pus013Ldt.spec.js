// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013Ldt');
const stub = require('./pus013Ldt.stub')();



describe('protobuf/isis/pusGroundModel/Pus013Ldt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013Ldt.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013Ldt');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      startTime: { type: 'time', value: stub.startTime },
      endTime: { type: 'time', value: stub.endTime },
      transferType: { type: 'uinteger', value: stub.transferType },
      lduId: { type: 'uinteger', value: stub.lduId },
      status: { type: 'uinteger', value: stub.status },
      size: { type: 'uinteger', value: stub.size },
      remainingSize: { type: 'integer', value: stub.remainingSize },
      percent: { type: 'uinteger', value: stub.percent },
      failureCode: { type: 'uinteger', value: stub.failureCode },
      fileId: { type: 'uinteger', value: stub.fileId },
      partitionId: { type: 'uinteger', value: stub.partitionId },
      fileChecksum: { type: 'string', value: stub.fileChecksum },
      fileTypeCode: { type: 'uinteger', value: stub.fileTypeCode },
      noLDTParts: { type: 'uinteger', value: stub.noLDTParts },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
    });
    expect(decoded.pUS013LdtPart).toHaveLength(stub.pUS013LdtPart.length);
    for (let i = 0; i < stub.pUS013LdtPart.length; i += 1) {
      expect(decoded.pUS013LdtPart[i]).toMatchObject({
        status: { type: 'uinteger', value: stub.pUS013LdtPart[i].status },
        partSize: { type: 'uinteger', value: stub.pUS013LdtPart[i].partSize },
        partId: { type: 'uinteger', value: stub.pUS013LdtPart[i].partId },
        sourceId: { type: 'uinteger', value: stub.pUS013LdtPart[i].sourceId },
        commandApid: { type: 'uinteger', value: stub.pUS013LdtPart[i].commandApid },
        sequenceCount: { type: 'uinteger', value: stub.pUS013LdtPart[i].sequenceCount },
        serviceDataUnit: { type: 'blob', value: stub.pUS013LdtPart[i].serviceDataUnit },
      });
      
    }
  });
});
