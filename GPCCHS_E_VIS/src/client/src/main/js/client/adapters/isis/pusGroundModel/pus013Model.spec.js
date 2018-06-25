// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013Model');
const stub = require('./pus013Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus013Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      noOnGoingDownlinkLDTPacket: { type: 'uinteger', value: stub.noOnGoingDownlinkLDTPacket },
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      noOnGoingUplinkLDTFile: { type: 'uinteger', value: stub.noOnGoingUplinkLDTFile },
      noOnGoingDownlinkLDTFile: { type: 'uinteger', value: stub.noOnGoingDownlinkLDTFile },
      currentUplinkLduIdPosition: { type: 'uinteger', value: stub.currentUplinkLduIdPosition },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uoctet', value: stub.status },
      noOnGoingUplinkLDTPacket: { type: 'uinteger', value: stub.noOnGoingUplinkLDTPacket },
    });
    expect(decoded.pUS013UplinkLdt).toHaveLength(stub.pUS013UplinkLdt.length);
    for (let i = 0; i < stub.pUS013UplinkLdt.length; i += 1) {
      expect(decoded.pUS013UplinkLdt[i]).toMatchObject({
        ackTimerArmed: { type: 'boolean', value: stub.pUS013UplinkLdt[i].ackTimerArmed },
        ackTimerDeadline: { type: 'long', symbol: `${stub.pUS013UplinkLdt[i].ackTimerDeadline}` },
        pus013Ldt: {
          startTime: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.startTime },
          endTime: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.endTime },
          transferType: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.transferType },
          lduId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.lduId },
          status: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.status },
          size: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.size },
          remainingSize: { type: 'integer', value: stub.pUS013UplinkLdt[i].pus013Ldt.remainingSize },
          percent: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.percent },
          failureCode: { type: 'string', value: stub.pUS013UplinkLdt[i].pus013Ldt.failureCode },
          fileId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.fileId },
          partitionId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.partitionId },
          fileChecksum: { type: 'string', value: stub.pUS013UplinkLdt[i].pus013Ldt.fileChecksum },
          fileTypeCode: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.fileTypeCode },
          noLDTParts: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.noLDTParts },
          pusElement: {
            lastUpdateMode: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.pusElement.lastUpdateTime },
          },
          lastUpdateModeLduId: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeLduId },
          lastUpdateTimeLduId: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeLduId },
          lastUpdateModeSize: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeSize },
          lastUpdateTimeSize: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeSize },
          lastUpdateModeStartTime: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeStartTime },
          lastUpdateTimeStartTime: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeStartTime },
          lastUpdateModeEndTime: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeEndTime },
          lastUpdateTimeEndTime: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeEndTime },
          lastUpdateModeStatus: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeStatus },
          lastUpdateTimeStatus: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeStatus },
          lastUpdateModeRemainSize: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeRemainSize },
          lastUpdateTimeRemainSize: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeRemainSize },
          lastUpdateModePercent: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModePercent },
          lastUpdateTimePercent: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimePercent },
          lastUpdateModeFailureCode: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeFailureCode },
          lastUpdateTimeFailureCode: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeFailureCode },
          lastUpdateModeFileChecksum: { type: 'uoctet', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateModeFileChecksum },
          lastUpdateTimeFileChecksum: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.lastUpdateTimeFileChecksum },
        },
      });
      
    }
    expect(decoded.pUS013DownlinkLdt).toHaveLength(stub.pUS013DownlinkLdt.length);
    for (let i = 0; i < stub.pUS013DownlinkLdt.length; i += 1) {
      expect(decoded.pUS013DownlinkLdt[i]).toMatchObject({
        receptionTimerArmed: { type: 'boolean', value: stub.pUS013DownlinkLdt[i].receptionTimerArmed },
        receptionTimerDeadline: { type: 'time', value: stub.pUS013DownlinkLdt[i].receptionTimerDeadline },
        groundDate: { type: 'long', symbol: `${stub.pUS013DownlinkLdt[i].groundDate}` },
        pus013Ldt: {
          startTime: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.startTime },
          endTime: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.endTime },
          transferType: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.transferType },
          lduId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lduId },
          status: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.status },
          size: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.size },
          remainingSize: { type: 'integer', value: stub.pUS013DownlinkLdt[i].pus013Ldt.remainingSize },
          percent: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.percent },
          failureCode: { type: 'string', value: stub.pUS013DownlinkLdt[i].pus013Ldt.failureCode },
          fileId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.fileId },
          partitionId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.partitionId },
          fileChecksum: { type: 'string', value: stub.pUS013DownlinkLdt[i].pus013Ldt.fileChecksum },
          fileTypeCode: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.fileTypeCode },
          noLDTParts: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.noLDTParts },
          pusElement: {
            lastUpdateMode: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.pusElement.lastUpdateTime },
          },
          lastUpdateModeLduId: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeLduId },
          lastUpdateTimeLduId: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeLduId },
          lastUpdateModeSize: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeSize },
          lastUpdateTimeSize: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeSize },
          lastUpdateModeStartTime: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeStartTime },
          lastUpdateTimeStartTime: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeStartTime },
          lastUpdateModeEndTime: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeEndTime },
          lastUpdateTimeEndTime: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeEndTime },
          lastUpdateModeStatus: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeStatus },
          lastUpdateTimeStatus: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeStatus },
          lastUpdateModeRemainSize: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeRemainSize },
          lastUpdateTimeRemainSize: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeRemainSize },
          lastUpdateModePercent: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModePercent },
          lastUpdateTimePercent: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimePercent },
          lastUpdateModeFailureCode: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeFailureCode },
          lastUpdateTimeFailureCode: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeFailureCode },
          lastUpdateModeFileChecksum: { type: 'uoctet', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateModeFileChecksum },
          lastUpdateTimeFileChecksum: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.lastUpdateTimeFileChecksum },
        },
      });
      
    }
  });
});
