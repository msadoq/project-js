// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cUStatus');
const stub = require('./cUStatus.stub')();

const cUState = require('./cUState');

describe('protobuf/isis/connection/CUStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUStatus');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      state: { type: 'enum', value: stub.state, symbol: cUState[stub.state] },
      sLEReport: (typeof stub.sLEReport === 'undefined')
        ? null
        : { type: 'blob', value: stub.sLEReport },
    });
    
  });
});
