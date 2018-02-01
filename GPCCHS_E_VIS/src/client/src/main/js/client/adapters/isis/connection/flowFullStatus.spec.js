// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowFullStatus');
const stub = require('./flowFullStatus.stub')();

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/FlowFullStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowFullStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowFullStatus');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      status: {
        status: {
          state: { type: 'enum', value: stub.status.status.state, symbol: synthesisState[stub.status.status.state] },
        },
      },
      identifier: {
        flowID: { type: 'long', symbol: `${stub.identifier.flowID}` },
        spacecraftID: { type: 'string', value: stub.identifier.spacecraftID },
        stationID: { type: 'string', value: stub.identifier.stationID },
        flowInfo: (typeof stub.identifier.flowInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: stub.identifier.flowInfo.name },
            isDefault: { type: 'boolean', value: stub.identifier.flowInfo.isDefault },
          },
      },
    });
    
  });
});
