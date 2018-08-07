// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013Model');
const stub = require('./pus013Model.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus013Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013Model.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus013Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      status: { type: 'string', value: stub.status },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pUS013UplinkLdt).toHaveLength(stub.pUS013UplinkLdt.length);
    for (let i = 0; i < stub.pUS013UplinkLdt.length; i += 1) {
      expect(decoded.pUS013UplinkLdt[i]).toMatchObject({
        lduId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lduId },
        status: { type: 'string', value: stub.pUS013UplinkLdt[i].status },
        transferType: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].transferType },
        fileTypeCode: { type: 'string', value: stub.pUS013UplinkLdt[i].fileTypeCode },
        startTime: { type: 'string', value: stub.pUS013UplinkLdt[i].startTime },
        endTime: { type: 'string', value: stub.pUS013UplinkLdt[i].endTime },
        size: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].size },
        remainingSize: { type: 'integer', value: stub.pUS013UplinkLdt[i].remainingSize },
        percent: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].percent },
        failureCode: { type: 'string', value: stub.pUS013UplinkLdt[i].failureCode },
        partitionId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].partitionId },
        fileId: { type: 'string', value: stub.pUS013UplinkLdt[i].fileId },
        fileChecksum: { type: 'string', value: stub.pUS013UplinkLdt[i].fileChecksum },
        noLDTParts: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].noLDTParts },
        lastUpdateModeLduId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeLduId },
        lastUpdateTimeLduId: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeLduId },
        lastUpdateModeSize: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeSize },
        lastUpdateTimeSize: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeSize },
        lastUpdateModeStartTime: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeStartTime },
        lastUpdateTimeStartTime: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeStartTime },
        lastUpdateModeEndTime: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeEndTime },
        lastUpdateTimeEndTime: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeEndTime },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeStatus },
        lastUpdateModeRemainSize: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeRemainSize },
        lastUpdateTimeRemainSize: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeRemainSize },
        lastUpdateModePercent: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModePercent },
        lastUpdateTimePercent: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimePercent },
        lastUpdateModeFailureCode: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeFailureCode },
        lastUpdateTimeFailureCode: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeFailureCode },
        lastUpdateModeFileChecksum: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].lastUpdateModeFileChecksum },
        lastUpdateTimeFileChecksum: { type: 'string', value: stub.pUS013UplinkLdt[i].lastUpdateTimeFileChecksum },
        serviceApid: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pUS013UplinkLdt[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pUS013UplinkLdt[i].uniqueId}` },
      });
      expect(decoded.pUS013UplinkLdt[i].pUS013LdtPart).toHaveLength(stub.pUS013UplinkLdt[i].pUS013LdtPart.length);
      for (let ii = 0; ii < stub.pUS013UplinkLdt[i].pUS013LdtPart.length; ii += 1) {
        expect(decoded.pUS013UplinkLdt[i].pUS013LdtPart[ii]).toMatchObject({
          status: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].status },
          partSize: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].partSize },
          partId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].partId },
          sourceId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].sourceId },
          commandApid: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].commandApid },
          sequenceCount: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].sequenceCount },
          serviceDataUnit: { type: 'blob', value: stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].serviceDataUnit },
          uniqueId: { type: 'ulong', symbol: `${stub.pUS013UplinkLdt[i].pUS013LdtPart[ii].uniqueId}` },
        });
        
      }
    }
    expect(decoded.pUS013DownlinkLdt).toHaveLength(stub.pUS013DownlinkLdt.length);
    for (let i = 0; i < stub.pUS013DownlinkLdt.length; i += 1) {
      expect(decoded.pUS013DownlinkLdt[i]).toMatchObject({
        lduId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lduId },
        status: { type: 'string', value: stub.pUS013DownlinkLdt[i].status },
        transferType: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].transferType },
        fileTypeCode: { type: 'string', value: stub.pUS013DownlinkLdt[i].fileTypeCode },
        startTime: { type: 'string', value: stub.pUS013DownlinkLdt[i].startTime },
        endTime: { type: 'string', value: stub.pUS013DownlinkLdt[i].endTime },
        size: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].size },
        remainingSize: { type: 'integer', value: stub.pUS013DownlinkLdt[i].remainingSize },
        percent: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].percent },
        failureCode: { type: 'string', value: stub.pUS013DownlinkLdt[i].failureCode },
        partitionId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].partitionId },
        fileId: { type: 'string', value: stub.pUS013DownlinkLdt[i].fileId },
        fileChecksum: { type: 'string', value: stub.pUS013DownlinkLdt[i].fileChecksum },
        noLDTParts: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].noLDTParts },
        lastUpdateModeLduId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeLduId },
        lastUpdateTimeLduId: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeLduId },
        lastUpdateModeSize: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeSize },
        lastUpdateTimeSize: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeSize },
        lastUpdateModeStartTime: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeStartTime },
        lastUpdateTimeStartTime: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeStartTime },
        lastUpdateModeEndTime: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeEndTime },
        lastUpdateTimeEndTime: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeEndTime },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeStatus },
        lastUpdateModeRemainSize: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeRemainSize },
        lastUpdateTimeRemainSize: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeRemainSize },
        lastUpdateModePercent: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModePercent },
        lastUpdateTimePercent: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimePercent },
        lastUpdateModeFailureCode: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeFailureCode },
        lastUpdateTimeFailureCode: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeFailureCode },
        lastUpdateModeFileChecksum: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].lastUpdateModeFileChecksum },
        lastUpdateTimeFileChecksum: { type: 'string', value: stub.pUS013DownlinkLdt[i].lastUpdateTimeFileChecksum },
        serviceApid: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pUS013DownlinkLdt[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pUS013DownlinkLdt[i].uniqueId}` },
      });
      expect(decoded.pUS013DownlinkLdt[i].pUS013LdtPart).toHaveLength(stub.pUS013DownlinkLdt[i].pUS013LdtPart.length);
      for (let ii = 0; ii < stub.pUS013DownlinkLdt[i].pUS013LdtPart.length; ii += 1) {
        expect(decoded.pUS013DownlinkLdt[i].pUS013LdtPart[ii]).toMatchObject({
          status: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].status },
          partSize: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].partSize },
          partId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].partId },
          sourceId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].sourceId },
          commandApid: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].commandApid },
          sequenceCount: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].sequenceCount },
          serviceDataUnit: { type: 'blob', value: stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].serviceDataUnit },
          uniqueId: { type: 'ulong', symbol: `${stub.pUS013DownlinkLdt[i].pUS013LdtPart[ii].uniqueId}` },
        });
        
      }
    }
  });
});
