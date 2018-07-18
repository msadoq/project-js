// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowList');
const stub = require('./flowList.stub')();



describe('protobuf/isis/connection/FlowList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowList.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowList');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.flowElmts).toHaveLength(stub.flowElmts.length);
    for (let i = 0; i < stub.flowElmts.length; i += 1) {
      expect(decoded.flowElmts[i]).toMatchObject({
        flowIdentifier: {
          flowID: { type: 'long', symbol: `${stub.flowElmts[i].flowIdentifier.flowID}` },
          spacecraftID: { type: 'string', value: stub.flowElmts[i].flowIdentifier.spacecraftID },
          stationID: { type: 'string', value: stub.flowElmts[i].flowIdentifier.stationID },
          flowInfo: (typeof stub.flowElmts[i].flowIdentifier.flowInfo === 'undefined')
            ? null
            : {
              name: { type: 'string', value: stub.flowElmts[i].flowIdentifier.flowInfo.name },
              isDefault: { type: 'boolean', value: stub.flowElmts[i].flowIdentifier.flowInfo.isDefault },
            },
        },
      });
      expect(decoded.flowElmts[i].cUIdentifiers).toHaveLength(stub.flowElmts[i].cUIdentifiers.length);
      for (let ii = 0; ii < stub.flowElmts[i].cUIdentifiers.length; ii += 1) {
        expect(decoded.flowElmts[i].cUIdentifiers[ii]).toMatchObject({
          cUID: { type: 'long', symbol: `${stub.flowElmts[i].cUIdentifiers[ii].cUID}` },
          channelName: { type: 'string', value: stub.flowElmts[i].cUIdentifiers[ii].channelName },
          spacecraftID: { type: 'string', value: stub.flowElmts[i].cUIdentifiers[ii].spacecraftID },
          stationID: { type: 'string', value: stub.flowElmts[i].cUIdentifiers[ii].stationID },
          flowID: { type: 'long', symbol: `${stub.flowElmts[i].cUIdentifiers[ii].flowID}` },
          cUInfo: (typeof stub.flowElmts[i].cUIdentifiers[ii].cUInfo === 'undefined')
            ? null
            : {
              isSLE: { type: 'boolean', value: stub.flowElmts[i].cUIdentifiers[ii].cUInfo.isSLE },
              reconnectionNumber: (typeof stub.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionNumber === 'undefined')
                ? null
                : { type: 'integer', value: stub.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionNumber },
              reconnectionDelay: (typeof stub.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionDelay === 'undefined')
                ? null
                : { type: 'integer', value: stub.flowElmts[i].cUIdentifiers[ii].cUInfo.reconnectionDelay },
              name: { type: 'string', value: stub.flowElmts[i].cUIdentifiers[ii].cUInfo.name },
              sicFile: (typeof stub.flowElmts[i].cUIdentifiers[ii].cUInfo.sicFile === 'undefined')
                ? null
                : { type: 'string', value: stub.flowElmts[i].cUIdentifiers[ii].cUInfo.sicFile },
            },
        });
        
      }
      expect(decoded.flowElmts[i].processIdentifiers).toHaveLength(stub.flowElmts[i].processIdentifiers.length);
      for (let ii = 0; ii < stub.flowElmts[i].processIdentifiers.length; ii += 1) {
        expect(decoded.flowElmts[i].processIdentifiers[ii]).toMatchObject({
          processId: { type: 'long', symbol: `${stub.flowElmts[i].processIdentifiers[ii].processId}` },
          functionOId: { type: 'string', value: stub.flowElmts[i].processIdentifiers[ii].functionOId },
          processInfo: (typeof stub.flowElmts[i].processIdentifiers[ii].processInfo === 'undefined')
            ? null
            : {
              name: { type: 'string', value: stub.flowElmts[i].processIdentifiers[ii].processInfo.name },
            },
        });
        
      }
    }
  });
});
