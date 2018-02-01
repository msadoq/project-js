// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./processFullState');
const stub = require('./processFullState.stub')();

const processState = require('./processState');

describe('protobuf/isis/connection/ProcessFullState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProcessFullState.proto`, { keepCase: true })
    .lookup('connection.protobuf.ProcessFullState');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      processState: { type: 'enum', value: stub.processState, symbol: processState[stub.processState] },
      processId: { type: 'long', symbol: `${stub.processId}` },
      functionOId: { type: 'string', value: stub.functionOId },
    });
    
  });
});
