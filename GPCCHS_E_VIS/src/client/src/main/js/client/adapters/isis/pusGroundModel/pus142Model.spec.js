// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
    });
    expect(decoded.pus142FunctionalMonitoring).toHaveLength(stub.pus142FunctionalMonitoring.length);
    for (let i = 0; i < stub.pus142FunctionalMonitoring.length; i += 1) {
      expect(decoded.pus142FunctionalMonitoring[i]).toMatchObject({
        fmonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].fmonId },
        protectionStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].protectionStatus },
        status: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].status },
        checkingStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].checkingStatus },
        rid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].rid },
        validityParameterId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].validityParameterId },
        validityParameterMask: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].validityParameterMask },
        validityParameterExpectedValue: { type: 'double', symbol: stub.pus142FunctionalMonitoring[i].validityParameterExpectedValue.toString() },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus142FunctionalMonitoring[i].pusElement.lastUpdateTime },
        },
        ridLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].ridLabel },
        fmonIdLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].fmonIdLabel },
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
