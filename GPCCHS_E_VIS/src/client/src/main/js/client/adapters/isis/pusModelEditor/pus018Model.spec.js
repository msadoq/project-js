// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus018Model');
const stub = require('./pus018Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus018Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus018Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      engineStatus: { type: 'uinteger', value: stub.engineStatus },
      status: { type: 'uinteger', value: stub.status },
      lastUpdateModeEngineStatus: { type: 'uinteger', value: stub.lastUpdateModeEngineStatus },
      lastUpdateTimeEngineStatus: { type: 'string', value: stub.lastUpdateTimeEngineStatus },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus018Obcp).toHaveLength(stub.pus018Obcp.length);
    for (let i = 0; i < stub.pus018Obcp.length; i += 1) {
      expect(decoded.pus018Obcp[i]).toMatchObject({
        obcpId: { type: 'uinteger', value: stub.pus018Obcp[i].obcpId },
        status: { type: 'string', value: stub.pus018Obcp[i].status },
        stepId: { type: 'string', value: stub.pus018Obcp[i].stepId },
        partitionId: { type: 'string', value: stub.pus018Obcp[i].partitionId },
        observabilityLevel: { type: 'string', value: stub.pus018Obcp[i].observabilityLevel },
        priority: { type: 'string', value: stub.pus018Obcp[i].priority },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pus018Obcp[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pus018Obcp[i].lastUpdateTimeStatus },
        lastUpdateModeStepId: { type: 'uinteger', value: stub.pus018Obcp[i].lastUpdateModeStepId },
        lastUpdateTimeStepId: { type: 'string', value: stub.pus018Obcp[i].lastUpdateTimeStepId },
        lastUpdateModePartitionId: { type: 'uinteger', value: stub.pus018Obcp[i].lastUpdateModePartitionId },
        lastUpdateTimePartitionId: { type: 'string', value: stub.pus018Obcp[i].lastUpdateTimePartitionId },
        lastUpdateModePriority: { type: 'uinteger', value: stub.pus018Obcp[i].lastUpdateModePriority },
        lastUpdateTimePriority: { type: 'string', value: stub.pus018Obcp[i].lastUpdateTimePriority },
        lastUpdateModeObsLevel: { type: 'uinteger', value: stub.pus018Obcp[i].lastUpdateModeObsLevel },
        lastUpdateTimeObsLevel: { type: 'string', value: stub.pus018Obcp[i].lastUpdateTimeObsLevel },
        lastUpdateModeObcpId: { type: 'uinteger', value: stub.pus018Obcp[i].lastUpdateModeObcpId },
        lastUpdateTimeObcpId: { type: 'string', value: stub.pus018Obcp[i].lastUpdateTimeObcpId },
        serviceApid: { type: 'uinteger', value: stub.pus018Obcp[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus018Obcp[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus018Obcp[i].uniqueId}` },
      });
      expect(decoded.pus018Obcp[i].pusParameter).toHaveLength(stub.pus018Obcp[i].pusParameter.length);
      for (let ii = 0; ii < stub.pus018Obcp[i].pusParameter.length; ii += 1) {
        expect(decoded.pus018Obcp[i].pusParameter[ii]).toMatchObject({
          parameterId: { type: 'uinteger', value: stub.pus018Obcp[i].pusParameter[ii].parameterId },
          parameterName: { type: 'string', value: stub.pus018Obcp[i].pusParameter[ii].parameterName },
          value: { type: 'string', value: stub.pus018Obcp[i].pusParameter[ii].value },
          lastUpdateModeParameterId: { type: 'uinteger', value: stub.pus018Obcp[i].pusParameter[ii].lastUpdateModeParameterId },
          lastUpdateTimeParameterId: { type: 'string', value: stub.pus018Obcp[i].pusParameter[ii].lastUpdateTimeParameterId },
        });
        
      }
    }
  });
});
