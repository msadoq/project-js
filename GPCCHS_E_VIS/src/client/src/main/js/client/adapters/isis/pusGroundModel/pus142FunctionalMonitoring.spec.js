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
      status: { type: 'uoctet', value: stub.status },
      checkingStatus: { type: 'string', value: stub.checkingStatus },
      rid: { type: 'uinteger', value: stub.rid },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      validityParameterExpectedValue: { type: 'string', value: stub.validityParameterExpectedValue },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      ridLabel: { type: 'string', value: stub.ridLabel },
      fmonIdLabel: { type: 'string', value: stub.fmonIdLabel },
      lastUpdateModeFMonId: { type: 'uoctet', value: stub.lastUpdateModeFMonId },
      lastUpdateTimeFMonId: { type: 'time', value: stub.lastUpdateTimeFMonId },
      lastUpdateModeProtectionStatus: { type: 'uoctet', value: stub.lastUpdateModeProtectionStatus },
      lastUpdateTimeProtectionStatus: { type: 'time', value: stub.lastUpdateTimeProtectionStatus },
      lastUpdateModeCheckingStatus: { type: 'uoctet', value: stub.lastUpdateModeCheckingStatus },
      lastUpdateTimeCheckingStatus: { type: 'time', value: stub.lastUpdateTimeCheckingStatus },
      lastUpdateModeStatus: { type: 'uoctet', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'time', value: stub.lastUpdateTimeStatus },
      lastUpdateModeRid: { type: 'uoctet', value: stub.lastUpdateModeRid },
      lastUpdateTimeRid: { type: 'time', value: stub.lastUpdateTimeRid },
      lastUpdateModeValidParamId: { type: 'uoctet', value: stub.lastUpdateModeValidParamId },
      lastUpdateTimeValidParamId: { type: 'time', value: stub.lastUpdateTimeValidParamId },
      lastUpdateModeValidParamMask: { type: 'uoctet', value: stub.lastUpdateModeValidParamMask },
      lastUpdateTimeValidParamMask: { type: 'time', value: stub.lastUpdateTimeValidParamMask },
      lastUpdateModeValidParamExpectedValue: { type: 'uoctet', value: stub.lastUpdateModeValidParamExpectedValue },
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
