const uINTEGER = require('../ccsds_mal/uINTEGER');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const uLONG = require('../ccsds_mal/uLONG');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const pus011TimeShift = require('./pus011TimeShift');
const pus011CommandParameter = require('./pus011CommandParameter');
const _map = require('lodash/map');

module.exports = {
  encode: data => ({
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.encode(data.uniqueId)
      : null,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.encode(data.commandApid)
      : null,
    commandApidName: (data.commandApidName !== null && typeof data.commandApidName !== 'undefined')
      ? sTRING.encode(data.commandApidName)
      : null,
    commandName: (data.commandName !== null && typeof data.commandName !== 'undefined')
      ? sTRING.encode(data.commandName)
      : null,
    commandDescription: (data.commandDescription !== null && typeof data.commandDescription !== 'undefined')
      ? sTRING.encode(data.commandDescription)
      : null,
    commandSequenceCount: (data.commandSequenceCount !== null && typeof data.commandSequenceCount !== 'undefined')
      ? uINTEGER.encode(data.commandSequenceCount)
      : null,
    commandSourceId: (data.commandSourceId !== null && typeof data.commandSourceId !== 'undefined')
      ? uINTEGER.encode(data.commandSourceId)
      : null,
    commandSsId: (data.commandSsId !== null && typeof data.commandSsId !== 'undefined')
      ? uINTEGER.encode(data.commandSsId)
      : null,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.encode(data.serviceApid)
      : null,
    lastUpdateModeCommandId: (data.lastUpdateModeCommandId !== null && typeof data.lastUpdateModeCommandId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCommandId)
      : null,
    lastUpdateTimeCommandId: (data.lastUpdateTimeCommandId !== null && typeof data.lastUpdateTimeCommandId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCommandId)
      : null,
    commandBinaryProfile: (data.commandBinaryProfile !== null && typeof data.commandBinaryProfile !== 'undefined')
      ? sTRING.encode(data.commandBinaryProfile)
      : null,
    lastUpdateModeBinProf: (data.lastUpdateModeBinProf !== null && typeof data.lastUpdateModeBinProf !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeBinProf)
      : null,
    lastUpdateTimeBinProf: (data.lastUpdateTimeBinProf !== null && typeof data.lastUpdateTimeBinProf !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeBinProf)
      : null,
    commandGroundStatus: (data.commandGroundStatus !== null && typeof data.commandGroundStatus !== 'undefined')
      ? sTRING.encode(data.commandGroundStatus)
      : null,
    lastUpdateModeGroundStatus: (data.lastUpdateModeGroundStatus !== null && typeof data.lastUpdateModeGroundStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeGroundStatus)
      : null,
    lastUpdateTimeGroundStatus: (data.lastUpdateTimeGroundStatus !== null && typeof data.lastUpdateTimeGroundStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeGroundStatus)
      : null,
    commandStatus: (data.commandStatus !== null && typeof data.commandStatus !== 'undefined')
      ? uINTEGER.encode(data.commandStatus)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    currentExecutionTime: (data.currentExecutionTime !== null && typeof data.currentExecutionTime !== 'undefined')
      ? tIME.encode(data.currentExecutionTime)
      : null,
    lastUpdateModeCurrentExecTime: (data.lastUpdateModeCurrentExecTime !== null && typeof data.lastUpdateModeCurrentExecTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCurrentExecTime)
      : null,
    lastUpdateTimeCurrentExecTime: (data.lastUpdateTimeCurrentExecTime !== null && typeof data.lastUpdateTimeCurrentExecTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCurrentExecTime)
      : null,
    initialExecutionTime: (data.initialExecutionTime !== null && typeof data.initialExecutionTime !== 'undefined')
      ? tIME.encode(data.initialExecutionTime)
      : null,
    lastUpdateModeInitialExecTime: (data.lastUpdateModeInitialExecTime !== null && typeof data.lastUpdateModeInitialExecTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeInitialExecTime)
      : null,
    lastUpdateTimeInitialExecTime: (data.lastUpdateTimeInitialExecTime !== null && typeof data.lastUpdateTimeInitialExecTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeInitialExecTime)
      : null,
    totalTimeShiftOffset: (data.totalTimeShiftOffset !== null && typeof data.totalTimeShiftOffset !== 'undefined')
      ? iNTEGER.encode(data.totalTimeShiftOffset)
      : null,
    lastUpdateModeTotalTimeShiftOffset: (data.lastUpdateModeTotalTimeShiftOffset !== null && typeof data.lastUpdateModeTotalTimeShiftOffset !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeTotalTimeShiftOffset)
      : null,
    lastUpdateTimeTotalTimeShiftOffset: (data.lastUpdateTimeTotalTimeShiftOffset !== null && typeof data.lastUpdateTimeTotalTimeShiftOffset !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeTotalTimeShiftOffset)
      : null,
    pus011TimeShift: _map(data.pus011TimeShift, timeShift => pus011TimeShift.encode(timeShift)),
    pus011CommandParameters: _map(data.pus011CommandParameters, commandParameter => pus011CommandParameter.encode(commandParameter)),
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.encode(data.serviceApidName)
      : null,
  }),
  decode: data => ({
    uniqueId: (data.uniqueId !== null && typeof data.uniqueId !== 'undefined')
      ? uLONG.decode(data.uniqueId)
      : undefined,
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.decode(data.commandApid)
      : undefined,
    commandApidName: (data.commandApidName !== null && typeof data.commandApidName !== 'undefined')
      ? sTRING.decode(data.commandApidName)
      : undefined,
    commandName: (data.commandName !== null && typeof data.commandName !== 'undefined')
      ? sTRING.decode(data.commandName)
      : undefined,
    commandDescription: (data.commandDescription !== null && typeof data.commandDescription !== 'undefined')
      ? sTRING.decode(data.commandDescription)
      : undefined,
    commandSequenceCount: (data.commandSequenceCount !== null && typeof data.commandSequenceCount !== 'undefined')
      ? uINTEGER.decode(data.commandSequenceCount)
      : undefined,
    commandSourceId: (data.commandSourceId !== null && typeof data.commandSourceId !== 'undefined')
      ? uINTEGER.decode(data.commandSourceId)
      : undefined,
    commandSsId: (data.commandSsId !== null && typeof data.commandSsId !== 'undefined')
      ? uINTEGER.decode(data.commandSsId)
      : undefined,
    serviceApid: (data.serviceApid !== null && typeof data.serviceApid !== 'undefined')
      ? uINTEGER.decode(data.serviceApid)
      : undefined,
    lastUpdateModeCommandId: (data.lastUpdateModeCommandId !== null && typeof data.lastUpdateModeCommandId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCommandId)
      : undefined,
    lastUpdateTimeCommandId: (data.lastUpdateTimeCommandId !== null && typeof data.lastUpdateTimeCommandId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCommandId)
      : undefined,
    commandBinaryProfile: (data.commandBinaryProfile !== null && typeof data.commandBinaryProfile !== 'undefined')
      ? sTRING.decode(data.commandBinaryProfile)
      : undefined,
    lastUpdateModeBinProf: (data.lastUpdateModeBinProf !== null && typeof data.lastUpdateModeBinProf !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeBinProf)
      : undefined,
    lastUpdateTimeBinProf: (data.lastUpdateTimeBinProf !== null && typeof data.lastUpdateTimeBinProf !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeBinProf)
      : undefined,
    commandGroundStatus: (data.commandGroundStatus !== null && typeof data.commandGroundStatus !== 'undefined')
      ? sTRING.decode(data.commandGroundStatus)
      : undefined,
    lastUpdateModeGroundStatus: (data.lastUpdateModeGroundStatus !== null && typeof data.lastUpdateModeGroundStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeGroundStatus)
      : undefined,
    lastUpdateTimeGroundStatus: (data.lastUpdateTimeGroundStatus !== null && typeof data.lastUpdateTimeGroundStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeGroundStatus)
      : undefined,
    commandStatus: (data.commandStatus !== null && typeof data.commandStatus !== 'undefined')
      ? uINTEGER.decode(data.commandStatus)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    currentExecutionTime: (data.currentExecutionTime !== null && typeof data.currentExecutionTime !== 'undefined')
      ? tIME.decode(data.currentExecutionTime)
      : undefined,
    lastUpdateModeCurrentExecTime: (data.lastUpdateModeCurrentExecTime !== null && typeof data.lastUpdateModeCurrentExecTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCurrentExecTime)
      : undefined,
    lastUpdateTimeCurrentExecTime: (data.lastUpdateTimeCurrentExecTime !== null && typeof data.lastUpdateTimeCurrentExecTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCurrentExecTime)
      : undefined,
    initialExecutionTime: (data.initialExecutionTime !== null && typeof data.initialExecutionTime !== 'undefined')
      ? tIME.decode(data.initialExecutionTime)
      : undefined,
    lastUpdateModeInitialExecTime: (data.lastUpdateModeInitialExecTime !== null && typeof data.lastUpdateModeInitialExecTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeInitialExecTime)
      : undefined,
    lastUpdateTimeInitialExecTime: (data.lastUpdateTimeInitialExecTime !== null && typeof data.lastUpdateTimeInitialExecTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeInitialExecTime)
      : undefined,
    totalTimeShiftOffset: (data.totalTimeShiftOffset !== null && typeof data.totalTimeShiftOffset !== 'undefined')
      ? iNTEGER.decode(data.totalTimeShiftOffset)
      : undefined,
    lastUpdateModeTotalTimeShiftOffset: (data.lastUpdateModeTotalTimeShiftOffset !== null && typeof data.lastUpdateModeTotalTimeShiftOffset !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeTotalTimeShiftOffset)
      : undefined,
    lastUpdateTimeTotalTimeShiftOffset: (data.lastUpdateTimeTotalTimeShiftOffset !== null && typeof data.lastUpdateTimeTotalTimeShiftOffset !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeTotalTimeShiftOffset)
      : undefined,
    pus011TimeShift: _map(data.pus011TimeShift, timeShift => pus011TimeShift.decode(timeShift)),
    pus011CommandParameters: _map(data.pus011CommandParameters, commandParameter => pus011CommandParameter.decode(commandParameter)),
    serviceApidName: (data.serviceApidName !== null && typeof data.serviceApidName !== 'undefined')
      ? sTRING.decode(data.serviceApidName)
      : undefined,
  }),
};
