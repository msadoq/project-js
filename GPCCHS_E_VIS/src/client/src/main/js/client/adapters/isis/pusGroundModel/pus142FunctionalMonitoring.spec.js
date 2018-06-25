// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus142FunctionalMonitoring');
const stub = require('./pus142FunctionalMonitoring.stub')();



describe('protobuf/isis/pusGroundModel/Pus142FunctionalMonitoring', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142FunctionalMonitoring.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus142FunctionalMonitoring');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      fmonId: { type: 'uinteger', value: stub.fmonId },
      protectionStatus: { type: 'string', value: stub.protectionStatus },
      status: { type: 'uinteger', value: stub.status },
      checkingStatus: { type: 'string', value: stub.checkingStatus },
      rid: { type: 'uinteger', value: stub.rid },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      validityParameterExpectedValue: { type: 'string', value: stub.validityParameterExpectedValue },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      ridLabel: { type: 'string', value: stub.ridLabel },
      fmonIdLabel: { type: 'string', value: stub.fmonIdLabel },
      lastUpdateModeFMonId: { type: 'uinteger', value: stub.lastUpdateModeFMonId },
      lastUpdateTimeFMonId: { type: 'time', value: stub.lastUpdateTimeFMonId },
      lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.lastUpdateModeProtectionStatus },
      lastUpdateTimeProtectionStatus: { type: 'time', value: stub.lastUpdateTimeProtectionStatus },
      lastUpdateModeCheckingStatus: { type: 'uinteger', value: stub.lastUpdateModeCheckingStatus },
      lastUpdateTimeCheckingStatus: { type: 'time', value: stub.lastUpdateTimeCheckingStatus },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'time', value: stub.lastUpdateTimeStatus },
      lastUpdateModeRid: { type: 'uinteger', value: stub.lastUpdateModeRid },
      lastUpdateTimeRid: { type: 'time', value: stub.lastUpdateTimeRid },
      lastUpdateModeValidParamId: { type: 'uinteger', value: stub.lastUpdateModeValidParamId },
      lastUpdateTimeValidParamId: { type: 'time', value: stub.lastUpdateTimeValidParamId },
      lastUpdateModeValidParamMask: { type: 'uinteger', value: stub.lastUpdateModeValidParamMask },
      lastUpdateTimeValidParamMask: { type: 'time', value: stub.lastUpdateTimeValidParamMask },
      lastUpdateModeValidParamExpectedValue: { type: 'uinteger', value: stub.lastUpdateModeValidParamExpectedValue },
      lastUpdateTimeValidParamExpectedValue: { type: 'time', value: stub.lastUpdateTimeValidParamExpectedValue },
    });
    expect(decoded.pus142ParameterMonitoringDefinition).toHaveLength(stub.pus142ParameterMonitoringDefinition.length);
    for (let i = 0; i < stub.pus142ParameterMonitoringDefinition.length; i += 1) {
      expect(decoded.pus142ParameterMonitoringDefinition[i]).toMatchObject({
        paramMonId: { type: 'uinteger', value: stub.pus142ParameterMonitoringDefinition[i].paramMonId },
      });
      
    }
  });
});
