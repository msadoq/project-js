// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus018Obcp');
const stub = require('./pus018Obcp.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus018Obcp', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018Obcp.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus018Obcp');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      obcpId: { type: 'uinteger', value: stub.obcpId },
      status: { type: 'string', value: stub.status },
      stepId: { type: 'string', value: stub.stepId },
      partitionId: { type: 'string', value: stub.partitionId },
      observabilityLevel: { type: 'string', value: stub.observabilityLevel },
      priority: { type: 'string', value: stub.priority },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'string', value: stub.lastUpdateTimeStatus },
      lastUpdateModeStepId: { type: 'uinteger', value: stub.lastUpdateModeStepId },
      lastUpdateTimeStepId: { type: 'string', value: stub.lastUpdateTimeStepId },
      lastUpdateModePartitionId: { type: 'uinteger', value: stub.lastUpdateModePartitionId },
      lastUpdateTimePartitionId: { type: 'string', value: stub.lastUpdateTimePartitionId },
      lastUpdateModePriority: { type: 'uinteger', value: stub.lastUpdateModePriority },
      lastUpdateTimePriority: { type: 'string', value: stub.lastUpdateTimePriority },
      lastUpdateModeObsLevel: { type: 'uinteger', value: stub.lastUpdateModeObsLevel },
      lastUpdateTimeObsLevel: { type: 'string', value: stub.lastUpdateTimeObsLevel },
      lastUpdateModeObcpId: { type: 'uinteger', value: stub.lastUpdateModeObcpId },
      lastUpdateTimeObcpId: { type: 'string', value: stub.lastUpdateTimeObcpId },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pusParameter).toHaveLength(stub.pusParameter.length);
    for (let i = 0; i < stub.pusParameter.length; i += 1) {
      expect(decoded.pusParameter[i]).toMatchObject({
        parameterId: { type: 'uinteger', value: stub.pusParameter[i].parameterId },
        parameterName: { type: 'string', value: stub.pusParameter[i].parameterName },
        value: { type: 'string', value: stub.pusParameter[i].value },
        lastUpdateModeParameterId: { type: 'uinteger', value: stub.pusParameter[i].lastUpdateModeParameterId },
        lastUpdateTimeParameterId: { type: 'string', value: stub.pusParameter[i].lastUpdateTimeParameterId },
      });
      
    }
  });
});
