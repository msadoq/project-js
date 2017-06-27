// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./initStationConfiguration');
const stub = require('./initStationConfiguration.stub')();



describe('protobuf/isis/connection/InitStationConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/InitStationConfiguration.proto`, { keepCase: true })
    .lookup('connection.protobuf.InitStationConfiguration');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      identifier: {
        spacecraftID: { type: 'string', value: stub.identifier.spacecraftID },
        stationID: { type: 'string', value: stub.identifier.stationID },
      },
      configuration: (typeof stub.configuration === 'undefined')
        ? null
        : {
          reconnectionDelay: (typeof stub.configuration.reconnectionDelay === 'undefined')
            ? null
            : { type: 'integer', value: stub.configuration.reconnectionDelay },
          reconnectionNumber: (typeof stub.configuration.reconnectionNumber === 'undefined')
            ? null
            : { type: 'integer', value: stub.configuration.reconnectionNumber },
        },
    });
    
  });
});
