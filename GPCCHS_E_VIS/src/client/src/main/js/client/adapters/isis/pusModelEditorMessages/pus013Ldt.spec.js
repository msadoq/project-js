// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013Ldt');
const stub = require('./pus013Ldt.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus013Ldt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013Ldt.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus013Ldt');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      lduId: { type: 'uinteger', value: stub.lduId },
      status: { type: 'string', value: stub.status },
      transferType: { type: 'uinteger', value: stub.transferType },
      fileTypeCode: { type: 'string', value: stub.fileTypeCode },
      startTime: { type: 'string', value: stub.startTime },
      endTime: { type: 'string', value: stub.endTime },
      size: { type: 'uinteger', value: stub.size },
      remainingSize: { type: 'integer', value: stub.remainingSize },
      percent: { type: 'uinteger', value: stub.percent },
      failureCode: { type: 'string', value: stub.failureCode },
      partitionId: { type: 'uinteger', value: stub.partitionId },
      fileId: { type: 'string', value: stub.fileId },
      fileChecksum: { type: 'string', value: stub.fileChecksum },
      noLDTParts: { type: 'uinteger', value: stub.noLDTParts },
      lastUpdateModeLduId: { type: 'uinteger', value: stub.lastUpdateModeLduId },
      lastUpdateTimeLduId: { type: 'string', value: stub.lastUpdateTimeLduId },
      lastUpdateModeSize: { type: 'uinteger', value: stub.lastUpdateModeSize },
      lastUpdateTimeSize: { type: 'string', value: stub.lastUpdateTimeSize },
      lastUpdateModeStartTime: { type: 'uinteger', value: stub.lastUpdateModeStartTime },
      lastUpdateTimeStartTime: { type: 'string', value: stub.lastUpdateTimeStartTime },
      lastUpdateModeEndTime: { type: 'uinteger', value: stub.lastUpdateModeEndTime },
      lastUpdateTimeEndTime: { type: 'string', value: stub.lastUpdateTimeEndTime },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'string', value: stub.lastUpdateTimeStatus },
      lastUpdateModeRemainSize: { type: 'uinteger', value: stub.lastUpdateModeRemainSize },
      lastUpdateTimeRemainSize: { type: 'string', value: stub.lastUpdateTimeRemainSize },
      lastUpdateModePercent: { type: 'uinteger', value: stub.lastUpdateModePercent },
      lastUpdateTimePercent: { type: 'string', value: stub.lastUpdateTimePercent },
      lastUpdateModeFailureCode: { type: 'uinteger', value: stub.lastUpdateModeFailureCode },
      lastUpdateTimeFailureCode: { type: 'string', value: stub.lastUpdateTimeFailureCode },
      lastUpdateModeFileChecksum: { type: 'uinteger', value: stub.lastUpdateModeFileChecksum },
      lastUpdateTimeFileChecksum: { type: 'string', value: stub.lastUpdateTimeFileChecksum },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
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
        uniqueId: { type: 'ulong', symbol: `${stub.pUS013LdtPart[i].uniqueId}` },
      });
      
    }
  });
});
