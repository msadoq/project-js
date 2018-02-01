// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cUInfo');
const stub = require('./cUInfo.stub')();



describe('protobuf/isis/connection/CUInfo', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUInfo.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUInfo');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      isSLE: { type: 'boolean', value: stub.isSLE },
      reconnectionNumber: (typeof stub.reconnectionNumber === 'undefined')
        ? null
        : { type: 'integer', value: stub.reconnectionNumber },
      reconnectionDelay: (typeof stub.reconnectionDelay === 'undefined')
        ? null
        : { type: 'integer', value: stub.reconnectionDelay },
      name: { type: 'string', value: stub.name },
      sicFile: (typeof stub.sicFile === 'undefined')
        ? null
        : { type: 'string', value: stub.sicFile },
    });
    
  });
});
