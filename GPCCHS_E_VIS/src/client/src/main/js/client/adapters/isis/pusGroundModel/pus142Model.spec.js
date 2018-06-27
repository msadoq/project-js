// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus142Model');
const stub = require('./pus142Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus142Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus142Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      noOfFunctionalMonitoring: { type: 'uinteger', value: stub.noOfFunctionalMonitoring },
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
      lastUpdateModeServiceStatus: { type: 'uinteger', value: stub.lastUpdateModeServiceStatus },
      lastUpdateTimeServiceStatus: { type: 'time', value: stub.lastUpdateTimeServiceStatus },
    });
    expect(decoded.pus142FunctionalMonitoring).toHaveLength(stub.pus142FunctionalMonitoring.length);
    for (let i = 0; i < stub.pus142FunctionalMonitoring.length; i += 1) {
      expect(decoded.pus142FunctionalMonitoring[i]).toMatchObject({
        fmonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].fmonId },
        protectionStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].protectionStatus },
        status: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].status },
        checkingStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].checkingStatus },
        rid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].rid },
        validityParameterId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pus142FunctionalMonitoring[i].validityParameterMask },
        validityParameterExpectedValue: { type: 'string', value: stub.pus142FunctionalMonitoring[i].validityParameterExpectedValue },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus142FunctionalMonitoring[i].pusElement.lastUpdateTime },
        },
        ridLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].ridLabel },
        fmonIdLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].fmonIdLabel },
        lastUpdateModeFMonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeFMonId },
        lastUpdateTimeFMonId: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeFMonId },
        lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeProtectionStatus },
        lastUpdateTimeProtectionStatus: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeProtectionStatus },
        lastUpdateModeCheckingStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeCheckingStatus },
        lastUpdateTimeCheckingStatus: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeCheckingStatus },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeStatus },
        lastUpdateModeRid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeRid },
        lastUpdateTimeRid: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeRid },
        lastUpdateModeValidParamId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeValidParamId },
        lastUpdateTimeValidParamId: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeValidParamId },
        lastUpdateModeValidParamMask: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeValidParamMask },
        lastUpdateTimeValidParamMask: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeValidParamMask },
        lastUpdateModeValidParamExpectedValue: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeValidParamExpectedValue },
        lastUpdateTimeValidParamExpectedValue: { type: 'time', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeValidParamExpectedValue },
      });
      expect(decoded.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition).toHaveLength(stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.length);
      for (let ii = 0; ii < stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.length; ii += 1) {
        expect(decoded.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii]).toMatchObject({
          paramMonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].paramMonId },
        });
        
      }
    }
  });
});
