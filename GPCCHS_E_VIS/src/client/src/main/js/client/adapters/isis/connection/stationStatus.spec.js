// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./stationStatus');
const stub = require('./stationStatus.stub')();

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/StationStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StationStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.StationStatus');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      state: { type: 'enum', value: stub.state, symbol: synthesisState[stub.state] },
    });
    expect(decoded.flowStates).toHaveLength(stub.flowStates.length);
    for (let i = 0; i < stub.flowStates.length; i += 1) {
      expect(decoded.flowStates[i]).toMatchObject({
        status: {
          status: {
            state: { type: 'enum', value: stub.flowStates[i].status.status.state, symbol: synthesisState[stub.flowStates[i].status.status.state] },
          },
        },
        identifier: {
          flowID: { type: 'long', symbol: `${stub.flowStates[i].identifier.flowID}` },
          spacecraftID: { type: 'string', value: stub.flowStates[i].identifier.spacecraftID },
          stationID: { type: 'string', value: stub.flowStates[i].identifier.stationID },
          flowInfo: (typeof stub.flowStates[i].identifier.flowInfo === 'undefined')
            ? null
            : {
              name: { type: 'string', value: stub.flowStates[i].identifier.flowInfo.name },
              isDefault: { type: 'boolean', value: stub.flowStates[i].identifier.flowInfo.isDefault },
            },
        },
      });
      
    }
  });
});
