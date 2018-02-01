// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus018Obcp');
const stub = require('./pus018Obcp.stub')();



describe('protobuf/isis/pusGroundModel/Pus018Obcp', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018Obcp.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus018Obcp');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      id: { type: 'uinteger', value: stub.id },
      status: { type: 'uinteger', value: stub.status },
      stepId: { type: 'uinteger', value: stub.stepId },
      partitionId: { type: 'uinteger', value: stub.partitionId },
      observabilityLevel: { type: 'uinteger', value: stub.observabilityLevel },
      priority: { type: 'uinteger', value: stub.priority },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
    });
    expect(decoded.pus18Parameter).toHaveLength(stub.pus18Parameter.length);
    for (let i = 0; i < stub.pus18Parameter.length; i += 1) {
      expect(decoded.pus18Parameter[i]).toMatchObject({
        parameterId: { type: 'uinteger', value: stub.pus18Parameter[i].parameterId },
        parameterName: { type: 'string', value: stub.pus18Parameter[i].parameterName },
        value: { type: 'double', symbol: stub.pus18Parameter[i].value.toString() },
      });
      
    }
  });
});
