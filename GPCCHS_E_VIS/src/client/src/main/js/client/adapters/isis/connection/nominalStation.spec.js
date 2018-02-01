// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./nominalStation');
const stub = require('./nominalStation.stub')();



describe('protobuf/isis/connection/NominalStation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/NominalStation.proto`, { keepCase: true })
    .lookup('connection.protobuf.NominalStation');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      identifier: (typeof stub.identifier === 'undefined')
        ? null
        : {
          spacecraftID: { type: 'string', value: stub.identifier.spacecraftID },
          stationID: { type: 'string', value: stub.identifier.stationID },
        },
      nominal: { type: 'boolean', value: stub.nominal },
    });
    
  });
});
