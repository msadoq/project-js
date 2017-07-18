// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus018Model');
const stub = require('./pus018Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus018Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus018Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      engineStatus: { type: 'uinteger', value: stub.engineStatus },
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      noOBCPs: { type: 'uinteger', value: stub.noOBCPs },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus018Obcp).toHaveLength(stub.pus018Obcp.length);
    for (let i = 0; i < stub.pus018Obcp.length; i += 1) {
      expect(decoded.pus018Obcp[i]).toMatchObject({
        id: { type: 'uinteger', value: stub.pus018Obcp[i].id },
        status: { type: 'uinteger', value: stub.pus018Obcp[i].status },
        stepId: { type: 'uinteger', value: stub.pus018Obcp[i].stepId },
        partitionId: { type: 'uinteger', value: stub.pus018Obcp[i].partitionId },
        observabilityLevel: { type: 'uinteger', value: stub.pus018Obcp[i].observabilityLevel },
        priority: { type: 'uinteger', value: stub.pus018Obcp[i].priority },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus018Obcp[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus018Obcp[i].pusElement.lastUpdateTime },
        },
      });
      expect(decoded.pus018Obcp[i].pus18Parameter).toHaveLength(stub.pus018Obcp[i].pus18Parameter.length);
      for (let ii = 0; ii < stub.pus018Obcp[i].pus18Parameter.length; ii += 1) {
        expect(decoded.pus018Obcp[i].pus18Parameter[ii]).toMatchObject({
          parameterId: { type: 'uinteger', value: stub.pus018Obcp[i].pus18Parameter[ii].parameterId },
          parameterName: { type: 'string', value: stub.pus018Obcp[i].pus18Parameter[ii].parameterName },
          value: { type: 'double', symbol: stub.pus018Obcp[i].pus18Parameter[ii].value.toString() },
        });
        
      }
    }
    expect(decoded.pus018ConfiguredObcp).toHaveLength(stub.pus018ConfiguredObcp.length);
    for (let i = 0; i < stub.pus018ConfiguredObcp.length; i += 1) {
      expect(decoded.pus018ConfiguredObcp[i]).toMatchObject({
        id: { type: 'uinteger', value: stub.pus018ConfiguredObcp[i].id },
        hkParamNameForName: { type: 'string', value: stub.pus018ConfiguredObcp[i].hkParamNameForName },
        hkParamNameForId: { type: 'string', value: stub.pus018ConfiguredObcp[i].hkParamNameForId },
        hkParamNameForStatus: { type: 'string', value: stub.pus018ConfiguredObcp[i].hkParamNameForStatus },
        hkParamNameForPriority: { type: 'string', value: stub.pus018ConfiguredObcp[i].hkParamNameForPriority },
        hkParamNameForStepId: { type: 'string', value: stub.pus018ConfiguredObcp[i].hkParamNameForStepId },
        status: { type: 'uinteger', value: stub.pus018ConfiguredObcp[i].status },
        stepId: { type: 'uinteger', value: stub.pus018ConfiguredObcp[i].stepId },
        priority: { type: 'uinteger', value: stub.pus018ConfiguredObcp[i].priority },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus018ConfiguredObcp[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus018ConfiguredObcp[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
