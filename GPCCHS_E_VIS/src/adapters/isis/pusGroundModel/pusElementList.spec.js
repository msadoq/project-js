// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusElementList');
const stub = require('./pusElementList.stub')();



describe('protobuf/isis/pusGroundModel/PusElementList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusElementList.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.PusElementList');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.pusValue).toHaveLength(stub.pusValue.length);
    for (let i = 0; i < stub.pusValue.length; i += 1) {
      expect(decoded.pusValue[i]).toMatchObject({
        value: { type: 'double', symbol: stub.pusValue[i].value.toString() },
      });
      
    }
  });
});
