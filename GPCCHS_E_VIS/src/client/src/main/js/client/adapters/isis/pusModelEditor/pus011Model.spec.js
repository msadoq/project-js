// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011Model');
const stub = require('./pus011Model.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus011Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011Model.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus011Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      status: { type: 'uinteger', value: stub.status },
      spaceInNumberOfCommands: { type: 'boolean', value: stub.spaceInNumberOfCommands },
      scheduleStatus: { type: 'uinteger', value: stub.scheduleStatus },
      lastUpdateTimeScheduleStatus: { type: 'string', value: stub.lastUpdateTimeScheduleStatus },
      lastUpdateModeScheduleStatus: { type: 'uinteger', value: stub.lastUpdateModeScheduleStatus },
      noFreeCommands: { type: 'integer', value: stub.noFreeCommands },
      lastUpdateTimeNoFreeCommands: { type: 'string', value: stub.lastUpdateTimeNoFreeCommands },
      lastUpdateModeNoFreeCommands: { type: 'uinteger', value: stub.lastUpdateModeNoFreeCommands },
      freeSpace: { type: 'integer', value: stub.freeSpace },
      lastUpdateTimeFreeSpace: { type: 'string', value: stub.lastUpdateTimeFreeSpace },
      lastUpdateModeFreeSpace: { type: 'uinteger', value: stub.lastUpdateModeFreeSpace },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus011Apid).toHaveLength(stub.pus011Apid.length);
    for (let i = 0; i < stub.pus011Apid.length; i += 1) {
      expect(decoded.pus011Apid[i]).toMatchObject({
        apid: { type: 'uinteger', value: stub.pus011Apid[i].apid },
        lastUpdateModeApid: { type: 'uinteger', value: stub.pus011Apid[i].lastUpdateModeApid },
        lastUpdateTimeApid: { type: 'string', value: stub.pus011Apid[i].lastUpdateTimeApid },
        status: { type: 'uinteger', value: stub.pus011Apid[i].status },
        serviceApid: { type: 'uinteger', value: stub.pus011Apid[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus011Apid[i].serviceApidName },
        apidName: { type: 'string', value: stub.pus011Apid[i].apidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus011Apid[i].uniqueId}` },
      });
      
    }
    expect(decoded.pus011Command).toHaveLength(stub.pus011Command.length);
    for (let i = 0; i < stub.pus011Command.length; i += 1) {
      expect(decoded.pus011Command[i]).toMatchObject({
        uniqueId: { type: 'ulong', symbol: `${stub.pus011Command[i].uniqueId}` },
        commandApid: { type: 'uinteger', value: stub.pus011Command[i].commandApid },
        commandType: { type: 'uinteger', value: stub.pus011Command[i].commandType },
        commandSubType: { type: 'uinteger', value: stub.pus011Command[i].commandSubType },
        commandApidName: { type: 'string', value: stub.pus011Command[i].commandApidName },
        commandName: { type: 'string', value: stub.pus011Command[i].commandName },
        commandDescription: { type: 'string', value: stub.pus011Command[i].commandDescription },
        commandSequenceCount: { type: 'uinteger', value: stub.pus011Command[i].commandSequenceCount },
        commandSourceId: { type: 'uinteger', value: stub.pus011Command[i].commandSourceId },
        commandSsId: { type: 'uinteger', value: stub.pus011Command[i].commandSsId },
        serviceApid: { type: 'uinteger', value: stub.pus011Command[i].serviceApid },
        lastUpdateModeCommandId: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeCommandId },
        lastUpdateTimeCommandId: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeCommandId },
        commandBinaryProfile: { type: 'string', value: stub.pus011Command[i].commandBinaryProfile },
        lastUpdateModeBinProf: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeBinProf },
        lastUpdateTimeBinProf: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeBinProf },
        commandGroundStatus: { type: 'string', value: stub.pus011Command[i].commandGroundStatus },
        lastUpdateModeGroundStatus: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeGroundStatus },
        lastUpdateTimeGroundStatus: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeGroundStatus },
        commandStatus: { type: 'uinteger', value: stub.pus011Command[i].commandStatus },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeStatus },
        currentExecutionTime: { type: 'string', value: stub.pus011Command[i].currentExecutionTime },
        lastUpdateModeCurrentExecTime: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeCurrentExecTime },
        lastUpdateTimeCurrentExecTime: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeCurrentExecTime },
        initialExecutionTime: { type: 'string', value: stub.pus011Command[i].initialExecutionTime },
        lastUpdateModeInitialExecTime: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeInitialExecTime },
        lastUpdateTimeInitialExecTime: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeInitialExecTime },
        totalTimeShiftOffset: { type: 'integer', value: stub.pus011Command[i].totalTimeShiftOffset },
        lastUpdateModeTotalTimeShiftOffset: { type: 'uinteger', value: stub.pus011Command[i].lastUpdateModeTotalTimeShiftOffset },
        lastUpdateTimeTotalTimeShiftOffset: { type: 'string', value: stub.pus011Command[i].lastUpdateTimeTotalTimeShiftOffset },
        serviceApidName: { type: 'string', value: stub.pus011Command[i].serviceApidName },
      });
      expect(decoded.pus011Command[i].pus011CommandParameters).toHaveLength(stub.pus011Command[i].pus011CommandParameters.length);
      for (let ii = 0; ii < stub.pus011Command[i].pus011CommandParameters.length; ii += 1) {
        expect(decoded.pus011Command[i].pus011CommandParameters[ii]).toMatchObject({
          parameterName: { type: 'string', value: stub.pus011Command[i].pus011CommandParameters[ii].parameterName },
          parameterValue: { type: 'string', value: stub.pus011Command[i].pus011CommandParameters[ii].parameterValue },
          parameterDescription: { type: 'string', value: stub.pus011Command[i].pus011CommandParameters[ii].parameterDescription },
          lastUpdateMode: { type: 'uinteger', value: stub.pus011Command[i].pus011CommandParameters[ii].lastUpdateMode },
          lastUpdateTime: { type: 'string', value: stub.pus011Command[i].pus011CommandParameters[ii].lastUpdateTime },
        });
        
      }
      expect(decoded.pus011Command[i].pus011TimeShift).toHaveLength(stub.pus011Command[i].pus011TimeShift.length);
      for (let ii = 0; ii < stub.pus011Command[i].pus011TimeShift.length; ii += 1) {
        expect(decoded.pus011Command[i].pus011TimeShift[ii]).toMatchObject({
          applicationTime: { type: 'string', value: stub.pus011Command[i].pus011TimeShift[ii].applicationTime },
          timeShiftOffset: { type: 'integer', value: stub.pus011Command[i].pus011TimeShift[ii].timeShiftOffset },
          lastUpdateMode: { type: 'uinteger', value: stub.pus011Command[i].pus011TimeShift[ii].lastUpdateMode },
          lastUpdateTime: { type: 'string', value: stub.pus011Command[i].pus011TimeShift[ii].lastUpdateTime },
        });
        
      }
    }
    expect(decoded.pus011SubSchedule).toHaveLength(stub.pus011SubSchedule.length);
    for (let i = 0; i < stub.pus011SubSchedule.length; i += 1) {
      expect(decoded.pus011SubSchedule[i]).toMatchObject({
        serviceApid: { type: 'uinteger', value: stub.pus011SubSchedule[i].serviceApid },
        ssId: { type: 'uinteger', value: stub.pus011SubSchedule[i].ssId },
        status: { type: 'uinteger', value: stub.pus011SubSchedule[i].status },
        ssIdLabel: { type: 'string', value: stub.pus011SubSchedule[i].ssIdLabel },
        lastUpdateModeSubScheduleId: { type: 'uinteger', value: stub.pus011SubSchedule[i].lastUpdateModeSubScheduleId },
        lastUpdateTimeSubscheduleId: { type: 'string', value: stub.pus011SubSchedule[i].lastUpdateTimeSubscheduleId },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pus011SubSchedule[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pus011SubSchedule[i].lastUpdateTimeStatus },
        executionTimeFirstTc: { type: 'string', value: stub.pus011SubSchedule[i].executionTimeFirstTc },
        lastUpdateModeExecTimeFirstTc: { type: 'uinteger', value: stub.pus011SubSchedule[i].lastUpdateModeExecTimeFirstTc },
        lastUpdateTimeExecTimeFirstTc: { type: 'string', value: stub.pus011SubSchedule[i].lastUpdateTimeExecTimeFirstTc },
        serviceApidName: { type: 'string', value: stub.pus011SubSchedule[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus011SubSchedule[i].uniqueId}` },
      });
      
    }
  });
});
