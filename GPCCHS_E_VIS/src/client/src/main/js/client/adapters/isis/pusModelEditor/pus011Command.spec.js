// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011Command');
const stub = require('./pus011Command.stub')();



describe('protobuf/isis/pusModelEditor/Pus011Command', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Command.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus011Command');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      commandApid: { type: 'uinteger', value: stub.commandApid },
      commandApidName: { type: 'string', value: stub.commandApidName },
      commandName: { type: 'string', value: stub.commandName },
      commandDescription: { type: 'string', value: stub.commandDescription },
      commandSequenceCount: { type: 'uinteger', value: stub.commandSequenceCount },
      commandSourceId: { type: 'uinteger', value: stub.commandSourceId },
      commandSsId: { type: 'uinteger', value: stub.commandSsId },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      lastUpdateModeCommandId: { type: 'uinteger', value: stub.lastUpdateModeCommandId },
      lastUpdateTimeCommandId: { type: 'string', value: stub.lastUpdateTimeCommandId },
      commandBinaryProfile: { type: 'string', value: stub.commandBinaryProfile },
      lastUpdateModeBinProf: { type: 'uinteger', value: stub.lastUpdateModeBinProf },
      lastUpdateTimeBinProf: { type: 'string', value: stub.lastUpdateTimeBinProf },
      commandGroundStatus: { type: 'string', value: stub.commandGroundStatus },
      lastUpdateModeGroundStatus: { type: 'uinteger', value: stub.lastUpdateModeGroundStatus },
      lastUpdateTimeGroundStatus: { type: 'string', value: stub.lastUpdateTimeGroundStatus },
      commandStatus: { type: 'uinteger', value: stub.commandStatus },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'string', value: stub.lastUpdateTimeStatus },
      currentExecutionTime: { type: 'string', value: stub.currentExecutionTime },
      lastUpdateModeCurrentExecTime: { type: 'uinteger', value: stub.lastUpdateModeCurrentExecTime },
      lastUpdateTimeCurrentExecTime: { type: 'string', value: stub.lastUpdateTimeCurrentExecTime },
      initialExecutionTime: { type: 'string', value: stub.initialExecutionTime },
      lastUpdateModeInitialExecTime: { type: 'uinteger', value: stub.lastUpdateModeInitialExecTime },
      lastUpdateTimeInitialExecTime: { type: 'string', value: stub.lastUpdateTimeInitialExecTime },
      totalTimeShiftOffset: { type: 'integer', value: stub.totalTimeShiftOffset },
      lastUpdateModeTotalTimeShiftOffset: { type: 'uinteger', value: stub.lastUpdateModeTotalTimeShiftOffset },
      lastUpdateTimeTotalTimeShiftOffset: { type: 'string', value: stub.lastUpdateTimeTotalTimeShiftOffset },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
    });
    expect(decoded.pus011CommandParameters).toHaveLength(stub.pus011CommandParameters.length);
    for (let i = 0; i < stub.pus011CommandParameters.length; i += 1) {
      expect(decoded.pus011CommandParameters[i]).toMatchObject({
        parameterName: { type: 'string', value: stub.pus011CommandParameters[i].parameterName },
        parameterValue: { type: 'string', value: stub.pus011CommandParameters[i].parameterValue },
        parameterDescription: { type: 'string', value: stub.pus011CommandParameters[i].parameterDescription },
        lastUpdateMode: { type: 'uinteger', value: stub.pus011CommandParameters[i].lastUpdateMode },
        lastUpdateTime: { type: 'string', value: stub.pus011CommandParameters[i].lastUpdateTime },
      });
      
    }
    expect(decoded.pus011TimeShift).toHaveLength(stub.pus011TimeShift.length);
    for (let i = 0; i < stub.pus011TimeShift.length; i += 1) {
      expect(decoded.pus011TimeShift[i]).toMatchObject({
        applicationTime: { type: 'string', value: stub.pus011TimeShift[i].applicationTime },
        timeShiftOffset: { type: 'integer', value: stub.pus011TimeShift[i].timeShiftOffset },
        lastUpdateMode: { type: 'uinteger', value: stub.pus011TimeShift[i].lastUpdateMode },
        lastUpdateTime: { type: 'string', value: stub.pus011TimeShift[i].lastUpdateTime },
      });
      
    }
  });
});
