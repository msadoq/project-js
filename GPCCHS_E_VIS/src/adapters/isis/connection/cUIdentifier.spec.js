// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cUIdentifier');
const stub = require('./cUIdentifier.stub')();



describe('protobuf/isis/connection/CUIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUIdentifier');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      cUID: { type: 'long', symbol: `${stub.cUID}` },
      channelName: { type: 'string', value: stub.channelName },
      spacecraftID: { type: 'string', value: stub.spacecraftID },
      stationID: { type: 'string', value: stub.stationID },
      flowID: { type: 'long', symbol: `${stub.flowID}` },
      cUInfo: (typeof stub.cUInfo === 'undefined')
        ? null
        : {
          isSLE: { type: 'boolean', value: stub.cUInfo.isSLE },
          reconnectionNumber: (typeof stub.cUInfo.reconnectionNumber === 'undefined')
            ? null
            : { type: 'integer', value: stub.cUInfo.reconnectionNumber },
          reconnectionDelay: (typeof stub.cUInfo.reconnectionDelay === 'undefined')
            ? null
            : { type: 'integer', value: stub.cUInfo.reconnectionDelay },
          name: { type: 'string', value: stub.cUInfo.name },
          sicFile: (typeof stub.cUInfo.sicFile === 'undefined')
            ? null
            : { type: 'string', value: stub.cUInfo.sicFile },
        },
    });
    
  });
});
