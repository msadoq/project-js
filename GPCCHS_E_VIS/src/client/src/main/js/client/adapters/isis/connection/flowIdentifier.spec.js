// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowIdentifier');
const stub = require('./flowIdentifier.stub')();



describe('protobuf/isis/connection/FlowIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowIdentifier');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      flowID: { type: 'long', symbol: `${stub.flowID}` },
      spacecraftID: { type: 'string', value: stub.spacecraftID },
      stationID: { type: 'string', value: stub.stationID },
      flowInfo: (typeof stub.flowInfo === 'undefined')
        ? null
        : {
          name: { type: 'string', value: stub.flowInfo.name },
          isDefault: { type: 'boolean', value: stub.flowInfo.isDefault },
        },
    });
    
  });
});
