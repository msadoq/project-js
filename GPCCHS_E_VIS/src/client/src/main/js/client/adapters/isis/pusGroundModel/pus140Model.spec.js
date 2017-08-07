// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus140Model');
const stub = require('./pus140Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus140Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus140Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus140Model');
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
      noOfParameters: { type: 'uinteger', value: stub.noOfParameters },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus140Parameter).toHaveLength(stub.pus140Parameter.length);
    for (let i = 0; i < stub.pus140Parameter.length; i += 1) {
      expect(decoded.pus140Parameter[i]).toMatchObject({
        parameterId: { type: 'uinteger', value: stub.pus140Parameter[i].parameterId },
        apid: { type: 'uinteger', value: stub.pus140Parameter[i].apid },
        currentValue: { type: 'double', symbol: stub.pus140Parameter[i].currentValue.toString() },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus140Parameter[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus140Parameter[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
