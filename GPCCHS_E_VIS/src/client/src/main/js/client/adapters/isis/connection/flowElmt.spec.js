// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowElmt');
const stub = require('./flowElmt.stub')();



describe('protobuf/isis/connection/FlowElmt', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowElmt.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowElmt');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      flowIdentifier: {
        flowID: { type: 'long', symbol: `${stub.flowIdentifier.flowID}` },
        spacecraftID: { type: 'string', value: stub.flowIdentifier.spacecraftID },
        stationID: { type: 'string', value: stub.flowIdentifier.stationID },
        flowInfo: (typeof stub.flowIdentifier.flowInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: stub.flowIdentifier.flowInfo.name },
            isDefault: { type: 'boolean', value: stub.flowIdentifier.flowInfo.isDefault },
          },
      },
    });
    expect(decoded.cUIdentifiers).toHaveLength(stub.cUIdentifiers.length);
    for (let i = 0; i < stub.cUIdentifiers.length; i += 1) {
      expect(decoded.cUIdentifiers[i]).toMatchObject({
        cUID: { type: 'long', symbol: `${stub.cUIdentifiers[i].cUID}` },
        channelName: { type: 'string', value: stub.cUIdentifiers[i].channelName },
        spacecraftID: { type: 'string', value: stub.cUIdentifiers[i].spacecraftID },
        stationID: { type: 'string', value: stub.cUIdentifiers[i].stationID },
        flowID: { type: 'long', symbol: `${stub.cUIdentifiers[i].flowID}` },
        cUInfo: (typeof stub.cUIdentifiers[i].cUInfo === 'undefined')
          ? null
          : {
            isSLE: { type: 'boolean', value: stub.cUIdentifiers[i].cUInfo.isSLE },
            reconnectionNumber: (typeof stub.cUIdentifiers[i].cUInfo.reconnectionNumber === 'undefined')
              ? null
              : { type: 'integer', value: stub.cUIdentifiers[i].cUInfo.reconnectionNumber },
            reconnectionDelay: (typeof stub.cUIdentifiers[i].cUInfo.reconnectionDelay === 'undefined')
              ? null
              : { type: 'integer', value: stub.cUIdentifiers[i].cUInfo.reconnectionDelay },
            name: { type: 'string', value: stub.cUIdentifiers[i].cUInfo.name },
            sicFile: (typeof stub.cUIdentifiers[i].cUInfo.sicFile === 'undefined')
              ? null
              : { type: 'string', value: stub.cUIdentifiers[i].cUInfo.sicFile },
          },
      });
      
    }
    expect(decoded.processIdentifiers).toHaveLength(stub.processIdentifiers.length);
    for (let i = 0; i < stub.processIdentifiers.length; i += 1) {
      expect(decoded.processIdentifiers[i]).toMatchObject({
        processId: { type: 'long', symbol: `${stub.processIdentifiers[i].processId}` },
        functionOId: { type: 'string', value: stub.processIdentifiers[i].functionOId },
        processInfo: (typeof stub.processIdentifiers[i].processInfo === 'undefined')
          ? null
          : {
            name: { type: 'string', value: stub.processIdentifiers[i].processInfo.name },
          },
      });
      
    }
  });
});
