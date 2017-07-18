// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013UplinkLdt');
const stub = require('./pus013UplinkLdt.stub')();



describe('protobuf/isis/pusGroundModel/Pus013UplinkLdt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013UplinkLdt.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013UplinkLdt');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      ackTimerArmed: { type: 'boolean', value: stub.ackTimerArmed },
      ackTimerDeadline: { type: 'long', symbol: `${stub.ackTimerDeadline}` },
      pus013Ldt: {
        startTime: { type: 'time', value: stub.pus013Ldt.startTime },
        endTime: { type: 'time', value: stub.pus013Ldt.endTime },
        transferType: { type: 'uinteger', value: stub.pus013Ldt.transferType },
        lduId: { type: 'uinteger', value: stub.pus013Ldt.lduId },
        status: { type: 'uinteger', value: stub.pus013Ldt.status },
        size: { type: 'uinteger', value: stub.pus013Ldt.size },
        remainingSize: { type: 'integer', value: stub.pus013Ldt.remainingSize },
        percent: { type: 'uinteger', value: stub.pus013Ldt.percent },
        failureCode: { type: 'uinteger', value: stub.pus013Ldt.failureCode },
        fileId: { type: 'uinteger', value: stub.pus013Ldt.fileId },
        partitionId: { type: 'uinteger', value: stub.pus013Ldt.partitionId },
        fileChecksum: { type: 'string', value: stub.pus013Ldt.fileChecksum },
        fileTypeCode: { type: 'uinteger', value: stub.pus013Ldt.fileTypeCode },
        noLDTParts: { type: 'uinteger', value: stub.pus013Ldt.noLDTParts },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus013Ldt.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus013Ldt.pusElement.lastUpdateTime },
        },
      },
    });
    
  });
});
