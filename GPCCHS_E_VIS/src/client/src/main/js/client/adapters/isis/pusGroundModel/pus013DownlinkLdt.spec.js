// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013DownlinkLdt');
const stub = require('./pus013DownlinkLdt.stub')();



describe('protobuf/isis/pusGroundModel/Pus013DownlinkLdt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013DownlinkLdt.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013DownlinkLdt');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      receptionTimerArmed: { type: 'boolean', value: stub.receptionTimerArmed },
      receptionTimerDeadline: { type: 'time', value: stub.receptionTimerDeadline },
      groundDate: { type: 'long', symbol: `${stub.groundDate}` },
      pus013Ldt: {
        startTime: { type: 'time', value: stub.pus013Ldt.startTime },
        endTime: { type: 'time', value: stub.pus013Ldt.endTime },
        transferType: { type: 'uinteger', value: stub.pus013Ldt.transferType },
        lduId: { type: 'uinteger', value: stub.pus013Ldt.lduId },
        status: { type: 'uinteger', value: stub.pus013Ldt.status },
        size: { type: 'uinteger', value: stub.pus013Ldt.size },
        remainingSize: { type: 'integer', value: stub.pus013Ldt.remainingSize },
        percent: { type: 'uinteger', value: stub.pus013Ldt.percent },
        failureCode: { type: 'string', value: stub.pus013Ldt.failureCode },
        fileId: { type: 'uinteger', value: stub.pus013Ldt.fileId },
        partitionId: { type: 'uinteger', value: stub.pus013Ldt.partitionId },
        fileChecksum: { type: 'string', value: stub.pus013Ldt.fileChecksum },
        fileTypeCode: { type: 'uinteger', value: stub.pus013Ldt.fileTypeCode },
        noLDTParts: { type: 'uinteger', value: stub.pus013Ldt.noLDTParts },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus013Ldt.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus013Ldt.pusElement.lastUpdateTime },
        },
        lastUpdateModeLduId: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeLduId },
        lastUpdateTimeLduId: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeLduId },
        lastUpdateModeSize: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeSize },
        lastUpdateTimeSize: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeSize },
        lastUpdateModeStartTime: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeStartTime },
        lastUpdateTimeStartTime: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeStartTime },
        lastUpdateModeEndTime: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeEndTime },
        lastUpdateTimeEndTime: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeEndTime },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeStatus },
        lastUpdateModeRemainSize: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeRemainSize },
        lastUpdateTimeRemainSize: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeRemainSize },
        lastUpdateModePercent: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModePercent },
        lastUpdateTimePercent: { type: 'time', value: stub.pus013Ldt.lastUpdateTimePercent },
        lastUpdateModeFailureCode: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeFailureCode },
        lastUpdateTimeFailureCode: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeFailureCode },
        lastUpdateModeFileChecksum: { type: 'uinteger', value: stub.pus013Ldt.lastUpdateModeFileChecksum },
        lastUpdateTimeFileChecksum: { type: 'time', value: stub.pus013Ldt.lastUpdateTimeFileChecksum },
      },
    });
    
  });
});
