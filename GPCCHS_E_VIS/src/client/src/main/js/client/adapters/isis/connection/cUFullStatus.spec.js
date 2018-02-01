// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cUFullStatus');
const stub = require('./cUFullStatus.stub')();

const cUState = require('./cUState');

describe('protobuf/isis/connection/CUFullStatus', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CUFullStatus.proto`, { keepCase: true })
    .lookup('connection.protobuf.CUFullStatus');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      identifier: {
        cUID: { type: 'long', symbol: `${stub.identifier.cUID}` },
        channelName: { type: 'string', value: stub.identifier.channelName },
        spacecraftID: { type: 'string', value: stub.identifier.spacecraftID },
        stationID: { type: 'string', value: stub.identifier.stationID },
        flowID: { type: 'long', symbol: `${stub.identifier.flowID}` },
        cUInfo: (typeof stub.identifier.cUInfo === 'undefined')
          ? null
          : {
            isSLE: { type: 'boolean', value: stub.identifier.cUInfo.isSLE },
            reconnectionNumber: (typeof stub.identifier.cUInfo.reconnectionNumber === 'undefined')
              ? null
              : { type: 'integer', value: stub.identifier.cUInfo.reconnectionNumber },
            reconnectionDelay: (typeof stub.identifier.cUInfo.reconnectionDelay === 'undefined')
              ? null
              : { type: 'integer', value: stub.identifier.cUInfo.reconnectionDelay },
            name: { type: 'string', value: stub.identifier.cUInfo.name },
            sicFile: (typeof stub.identifier.cUInfo.sicFile === 'undefined')
              ? null
              : { type: 'string', value: stub.identifier.cUInfo.sicFile },
          },
      },
      status: {
        state: { type: 'enum', value: stub.status.state, symbol: cUState[stub.status.state] },
        sLEReport: (typeof stub.status.sLEReport === 'undefined')
          ? null
          : { type: 'blob', value: stub.status.sLEReport },
      },
    });
    
  });
});
