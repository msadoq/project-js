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
      status: { type: 'string', value: stub.status },
      stepId: { type: 'string', value: stub.stepId },
      partitionId: { type: 'string', value: stub.partitionId },
      observabilityLevel: { type: 'string', value: stub.observabilityLevel },
      priority: { type: 'string', value: stub.priority },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'time', value: stub.lastUpdateTimeStatus },
      lastUpdateModeStepId: { type: 'uinteger', value: stub.lastUpdateModeStepId },
      lastUpdateTimeStepId: { type: 'time', value: stub.lastUpdateTimeStepId },
      lastUpdateModePartitionId: { type: 'uinteger', value: stub.lastUpdateModePartitionId },
      lastUpdateTimePartitionId: { type: 'time', value: stub.lastUpdateTimePartitionId },
      lastUpdateModePriority: { type: 'uinteger', value: stub.lastUpdateModePriority },
      lastUpdateTimePriority: { type: 'time', value: stub.lastUpdateTimePriority },
      lastUpdateModeObsLevel: { type: 'uinteger', value: stub.lastUpdateModeObsLevel },
      lastUpdateTimeObsLevel: { type: 'time', value: stub.lastUpdateTimeObsLevel },
      lastUpdateModeObcpId: { type: 'uinteger', value: stub.lastUpdateModeObcpId },
      lastUpdateTimeObcpId: { type: 'time', value: stub.lastUpdateTimeObcpId },
    });
    expect(decoded.pus18Parameter).toHaveLength(stub.pus18Parameter.length);
    for (let i = 0; i < stub.pus18Parameter.length; i += 1) {
      expect(decoded.pus18Parameter[i]).toMatchObject({
        parameterId: { type: 'uinteger', value: stub.pus18Parameter[i].parameterId },
        parameterName: { type: 'string', value: stub.pus18Parameter[i].parameterName },
        value: { type: 'double', symbol: stub.pus18Parameter[i].value.toString() },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus18Parameter[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus18Parameter[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
