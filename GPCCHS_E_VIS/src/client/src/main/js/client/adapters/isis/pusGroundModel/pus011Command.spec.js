// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011Command');
const stub = require('./pus011Command.stub')();



describe('protobuf/isis/pusGroundModel/Pus011Command', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Command.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011Command');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      commandApid: { type: 'uinteger', value: stub.commandApid },
      commandBinaryProfile: { type: 'blob', value: stub.commandBinaryProfile },
      commandGroundStatus: { type: 'uoctet', value: stub.commandGroundStatus },
      commandName: { type: 'string', value: stub.commandName },
      commandSequenceCount: { type: 'uinteger', value: stub.commandSequenceCount },
      commandStatus: { type: 'uinteger', value: stub.commandStatus },
      currentExecutionTime: { type: 'time', value: stub.currentExecutionTime },
      initialExecutionTime: { type: 'time', value: stub.initialExecutionTime },
      commandSourceId: { type: 'ushort', value: stub.commandSourceId },
      ssId: { type: 'uinteger', value: stub.ssId },
      totalTimeShiftOffset: { type: 'integer', value: stub.totalTimeShiftOffset },
      pus011EncapsulatingTc: {
        sourceId: { type: 'ushort', value: stub.pus011EncapsulatingTc.sourceId },
        commandApid: { type: 'uinteger', value: stub.pus011EncapsulatingTc.commandApid },
        sequenceCount: { type: 'uinteger', value: stub.pus011EncapsulatingTc.sequenceCount },
      },
      invalidBinaryTcDetected: { type: 'boolean', value: stub.invalidBinaryTcDetected },
      apid: { type: 'uinteger', value: stub.apid },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: stub.groundDate },
      lastUpdateModeBinProfile: { type: 'uoctet', value: stub.lastUpdateModeBinProfile },
      lastUpdateTimeBinProfile: { type: 'time', value: stub.lastUpdateTimeBinProfile },
      lastUpdateModeGroundStatus: { type: 'uoctet', value: stub.lastUpdateModeGroundStatus },
      lastUpdateTimeGroundStatus: { type: 'time', value: stub.lastUpdateTimeGroundStatus },
      lastUpdateModeStatus: { type: 'uoctet', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'time', value: stub.lastUpdateTimeStatus },
      lastUpdateModeInitExecTime: { type: 'uoctet', value: stub.lastUpdateModeInitExecTime },
      lastUpdateTimeInitExecTime: { type: 'time', value: stub.lastUpdateTimeInitExecTime },
      lastUpdateModeTotalShiftOffset: { type: 'uoctet', value: stub.lastUpdateModeTotalShiftOffset },
      lastUpdateTimeCurrExecTime: { type: 'time', value: stub.lastUpdateTimeCurrExecTime },
      lastUpdateModeCurrExecTime: { type: 'uoctet', value: stub.lastUpdateModeCurrExecTime },
      lastUpdateTimeTotalShiftOffset: { type: 'time', value: stub.lastUpdateTimeTotalShiftOffset },
      lastUpdateModeCommandId: { type: 'uoctet', value: stub.lastUpdateModeCommandId },
      lastUpdateTimeCommandId: { type: 'time', value: stub.lastUpdateTimeCommandId },
    });
    expect(decoded.pus011CommandParameters).toHaveLength(stub.pus011CommandParameters.length);
    for (let i = 0; i < stub.pus011CommandParameters.length; i += 1) {
      expect(decoded.pus011CommandParameters[i]).toMatchObject({
        parameterName: { type: 'string', value: stub.pus011CommandParameters[i].parameterName },
        parameterValue: { type: 'double', symbol: stub.pus011CommandParameters[i].parameterValue.toString() },
      });
      
    }
    expect(decoded.pUS011TimeShift).toHaveLength(stub.pUS011TimeShift.length);
    for (let i = 0; i < stub.pUS011TimeShift.length; i += 1) {
      expect(decoded.pUS011TimeShift[i]).toMatchObject({
        applicationTime: { type: 'time', value: stub.pUS011TimeShift[i].applicationTime },
        timeShiftOffset: { type: 'integer', value: stub.pUS011TimeShift[i].timeShiftOffset },
      });
      
    }
  });
});
