// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011Model');
const stub = require('./pus011Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus011Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      maxNoTc: { type: 'uinteger', value: stub.maxNoTc },
      scheduleStatus: { type: 'uinteger', value: stub.scheduleStatus },
      apid: { type: 'uinteger', value: stub.apid },
      noCommands: { type: 'uinteger', value: stub.noCommands },
      noSubSchedule: { type: 'uinteger', value: stub.noSubSchedule },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: stub.groundDate },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus011Apid).toHaveLength(stub.pus011Apid.length);
    for (let i = 0; i < stub.pus011Apid.length; i += 1) {
      expect(decoded.pus011Apid[i]).toMatchObject({
        status: { type: 'uinteger', value: stub.pus011Apid[i].status },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus011Apid[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus011Apid[i].pusElement.lastUpdateTime },
        },
        apid: { type: 'uinteger', value: stub.pus011Apid[i].apid },
      });
      
    }
  });
});
