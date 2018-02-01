// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
      noOnGoingUplinkLDT: { type: 'uinteger', value: stub.noOnGoingUplinkLDT },
      noOnGoingDownlinkLDTFile: { type: 'uinteger', value: stub.noOnGoingDownlinkLDTFile },
      currentUplinkLduIdPosition: { type: 'uinteger', value: stub.currentUplinkLduIdPosition },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
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
          status: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.status },
          size: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.size },
          remainingSize: { type: 'integer', value: stub.pUS013UplinkLdt[i].pus013Ldt.remainingSize },
          percent: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.percent },
          failureCode: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.failureCode },
          fileId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.fileId },
          partitionId: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.partitionId },
          fileChecksum: { type: 'string', value: stub.pUS013UplinkLdt[i].pus013Ldt.fileChecksum },
          fileTypeCode: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.fileTypeCode },
          noLDTParts: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.noLDTParts },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pUS013UplinkLdt[i].pus013Ldt.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pUS013UplinkLdt[i].pus013Ldt.pusElement.lastUpdateTime },
          },
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
          status: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.status },
          size: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.size },
          remainingSize: { type: 'integer', value: stub.pUS013DownlinkLdt[i].pus013Ldt.remainingSize },
          percent: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.percent },
          failureCode: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.failureCode },
          fileId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.fileId },
          partitionId: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.partitionId },
          fileChecksum: { type: 'string', value: stub.pUS013DownlinkLdt[i].pus013Ldt.fileChecksum },
          fileTypeCode: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.fileTypeCode },
          noLDTParts: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.noLDTParts },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pUS013DownlinkLdt[i].pus013Ldt.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pUS013DownlinkLdt[i].pus013Ldt.pusElement.lastUpdateTime },
          },
        },
      });
      
    }
  });
});
