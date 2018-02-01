// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowSmallStatus');
const stub = require('./flowSmallStatus.stub')();

const cUState = require('./cUState');
const processState = require('./processState');
const synthesisState = require('./synthesisState');

describe('protobuf/isis/connection/FlowSmallStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowSmallStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowSmallStatus');
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
    expect(decoded.connectionStates).toHaveLength(stub.connectionStates.length);
    for (let i = 0; i < stub.connectionStates.length; i += 1) {
      expect(decoded.connectionStates[i]).toMatchObject({
        identifier: {
          cUID: { type: 'long', symbol: `${stub.connectionStates[i].identifier.cUID}` },
          channelName: { type: 'string', value: stub.connectionStates[i].identifier.channelName },
          spacecraftID: { type: 'string', value: stub.connectionStates[i].identifier.spacecraftID },
          stationID: { type: 'string', value: stub.connectionStates[i].identifier.stationID },
          flowID: { type: 'long', symbol: `${stub.connectionStates[i].identifier.flowID}` },
          cUInfo: (typeof stub.connectionStates[i].identifier.cUInfo === 'undefined')
            ? null
            : {
              isSLE: { type: 'boolean', value: stub.connectionStates[i].identifier.cUInfo.isSLE },
              reconnectionNumber: (typeof stub.connectionStates[i].identifier.cUInfo.reconnectionNumber === 'undefined')
                ? null
                : { type: 'integer', value: stub.connectionStates[i].identifier.cUInfo.reconnectionNumber },
              reconnectionDelay: (typeof stub.connectionStates[i].identifier.cUInfo.reconnectionDelay === 'undefined')
                ? null
                : { type: 'integer', value: stub.connectionStates[i].identifier.cUInfo.reconnectionDelay },
              name: { type: 'string', value: stub.connectionStates[i].identifier.cUInfo.name },
              sicFile: (typeof stub.connectionStates[i].identifier.cUInfo.sicFile === 'undefined')
                ? null
                : { type: 'string', value: stub.connectionStates[i].identifier.cUInfo.sicFile },
            },
        },
        status: {
          state: { type: 'enum', value: stub.connectionStates[i].status.state, symbol: cUState[stub.connectionStates[i].status.state] },
          sLEReport: (typeof stub.connectionStates[i].status.sLEReport === 'undefined')
            ? null
            : { type: 'blob', value: stub.connectionStates[i].status.sLEReport },
        },
      });
      
    }
    expect(decoded.processFullState).toHaveLength(stub.processFullState.length);
    for (let i = 0; i < stub.processFullState.length; i += 1) {
      expect(decoded.processFullState[i]).toMatchObject({
        processState: { type: 'enum', value: stub.processFullState[i].processState, symbol: processState[stub.processFullState[i].processState] },
        processId: { type: 'long', symbol: `${stub.processFullState[i].processId}` },
        functionOId: { type: 'string', value: stub.processFullState[i].functionOId },
      });
      
    }
  });
});
