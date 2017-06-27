// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowStatus');
const stub = require('./flowStatus.stub')();

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/FlowStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowStatus');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      status: {
        state: { type: 'enum', value: stub.status.state, symbol: synthesisState[stub.status.state] },
      },
    });
    
  });
});
