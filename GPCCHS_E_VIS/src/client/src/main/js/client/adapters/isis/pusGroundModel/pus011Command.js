// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const pus011CommandParameter = require('./pus011CommandParameter');
const pus011EncapsulatingTc = require('./pus011EncapsulatingTc');
const pus011TimeShift = require('./pus011TimeShift');
const pusElement = require('./pusElement');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.encode(data.commandApid)
      : null,
    commandBinaryProfile: (data.commandBinaryProfile !== null && typeof data.commandBinaryProfile !== 'undefined')
      ? bLOB.encode(data.commandBinaryProfile)
      : null,
    commandGroundStatus: (data.commandGroundStatus !== null && typeof data.commandGroundStatus !== 'undefined')
      ? uINTEGER.encode(data.commandGroundStatus)
      : null,
    commandName: (data.commandName !== null && typeof data.commandName !== 'undefined')
      ? sTRING.encode(data.commandName)
      : null,
    commandSequenceCount: (data.commandSequenceCount !== null && typeof data.commandSequenceCount !== 'undefined')
      ? uINTEGER.encode(data.commandSequenceCount)
      : null,
    commandStatus: (data.commandStatus !== null && typeof data.commandStatus !== 'undefined')
      ? uINTEGER.encode(data.commandStatus)
      : null,
    currentExecutionTime: (data.currentExecutionTime !== null && typeof data.currentExecutionTime !== 'undefined')
      ? tIME.encode(data.currentExecutionTime)
      : null,
    initialExecutionTime: (data.initialExecutionTime !== null && typeof data.initialExecutionTime !== 'undefined')
      ? tIME.encode(data.initialExecutionTime)
      : null,
    commandSourceId: (data.commandSourceId !== null && typeof data.commandSourceId !== 'undefined')
      ? uINTEGER.encode(data.commandSourceId)
      : null,
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.encode(data.ssId)
      : null,
    totalTimeShiftOffset: (data.totalTimeShiftOffset !== null && typeof data.totalTimeShiftOffset !== 'undefined')
      ? iNTEGER.encode(data.totalTimeShiftOffset)
      : null,
    pus011EncapsulatingTc: (data.pus011EncapsulatingTc !== null && typeof data.pus011EncapsulatingTc !== 'undefined')
      ? pus011EncapsulatingTc.encode(data.pus011EncapsulatingTc)
      : null,
    pus011CommandParameters: _map(data.pus011CommandParameters, d => (pus011CommandParameter.encode(d))),
    pUS011TimeShift: _map(data.pUS011TimeShift, d => (pus011TimeShift.encode(d))),
    invalidBinaryTcDetected: (data.invalidBinaryTcDetected !== null && typeof data.invalidBinaryTcDetected !== 'undefined')
      ? bOOLEAN.encode(data.invalidBinaryTcDetected)
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.encode(data.apid)
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    lastUpdateModeBinProfile: (data.lastUpdateModeBinProfile !== null && typeof data.lastUpdateModeBinProfile !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeBinProfile)
      : null,
    lastUpdateTimeBinProfile: (data.lastUpdateTimeBinProfile !== null && typeof data.lastUpdateTimeBinProfile !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeBinProfile)
      : null,
    lastUpdateModeGroundStatus: (data.lastUpdateModeGroundStatus !== null && typeof data.lastUpdateModeGroundStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeGroundStatus)
      : null,
    lastUpdateTimeGroundStatus: (data.lastUpdateTimeGroundStatus !== null && typeof data.lastUpdateTimeGroundStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeGroundStatus)
      : null,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeStatus)
      : null,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeStatus)
      : null,
    lastUpdateModeInitExecTime: (data.lastUpdateModeInitExecTime !== null && typeof data.lastUpdateModeInitExecTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeInitExecTime)
      : null,
    lastUpdateTimeInitExecTime: (data.lastUpdateTimeInitExecTime !== null && typeof data.lastUpdateTimeInitExecTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeInitExecTime)
      : null,
    lastUpdateModeTotalShiftOffset: (data.lastUpdateModeTotalShiftOffset !== null && typeof data.lastUpdateModeTotalShiftOffset !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeTotalShiftOffset)
      : null,
    lastUpdateTimeCurrExecTime: (data.lastUpdateTimeCurrExecTime !== null && typeof data.lastUpdateTimeCurrExecTime !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCurrExecTime)
      : null,
    lastUpdateModeCurrExecTime: (data.lastUpdateModeCurrExecTime !== null && typeof data.lastUpdateModeCurrExecTime !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCurrExecTime)
      : null,
    lastUpdateTimeTotalShiftOffset: (data.lastUpdateTimeTotalShiftOffset !== null && typeof data.lastUpdateTimeTotalShiftOffset !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeTotalShiftOffset)
      : null,
    lastUpdateModeCommandId: (data.lastUpdateModeCommandId !== null && typeof data.lastUpdateModeCommandId !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateModeCommandId)
      : null,
    lastUpdateTimeCommandId: (data.lastUpdateTimeCommandId !== null && typeof data.lastUpdateTimeCommandId !== 'undefined')
      ? tIME.encode(data.lastUpdateTimeCommandId)
      : null,
  }),
  decode: data => ({
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? uINTEGER.decode(data.commandApid)
      : undefined,
    commandBinaryProfile: (data.commandBinaryProfile !== null && typeof data.commandBinaryProfile !== 'undefined')
      ? bLOB.decode(data.commandBinaryProfile)
      : undefined,
    commandGroundStatus: (data.commandGroundStatus !== null && typeof data.commandGroundStatus !== 'undefined')
      ? uINTEGER.decode(data.commandGroundStatus)
      : undefined,
    commandName: (data.commandName !== null && typeof data.commandName !== 'undefined')
      ? sTRING.decode(data.commandName)
      : undefined,
    commandSequenceCount: (data.commandSequenceCount !== null && typeof data.commandSequenceCount !== 'undefined')
      ? uINTEGER.decode(data.commandSequenceCount)
      : undefined,
    commandStatus: (data.commandStatus !== null && typeof data.commandStatus !== 'undefined')
      ? uINTEGER.decode(data.commandStatus)
      : undefined,
    currentExecutionTime: (data.currentExecutionTime !== null && typeof data.currentExecutionTime !== 'undefined')
      ? tIME.decode(data.currentExecutionTime)
      : undefined,
    initialExecutionTime: (data.initialExecutionTime !== null && typeof data.initialExecutionTime !== 'undefined')
      ? tIME.decode(data.initialExecutionTime)
      : undefined,
    commandSourceId: (data.commandSourceId !== null && typeof data.commandSourceId !== 'undefined')
      ? uINTEGER.decode(data.commandSourceId)
      : undefined,
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? uINTEGER.decode(data.ssId)
      : undefined,
    totalTimeShiftOffset: (data.totalTimeShiftOffset !== null && typeof data.totalTimeShiftOffset !== 'undefined')
      ? iNTEGER.decode(data.totalTimeShiftOffset)
      : undefined,
    pus011EncapsulatingTc: (data.pus011EncapsulatingTc !== null && typeof data.pus011EncapsulatingTc !== 'undefined')
      ? pus011EncapsulatingTc.decode(data.pus011EncapsulatingTc)
      : undefined,
    pus011CommandParameters: _map(data.pus011CommandParameters, d => (pus011CommandParameter.decode(d))),
    pUS011TimeShift: _map(data.pUS011TimeShift, d => (pus011TimeShift.decode(d))),
    invalidBinaryTcDetected: (data.invalidBinaryTcDetected !== null && typeof data.invalidBinaryTcDetected !== 'undefined')
      ? bOOLEAN.decode(data.invalidBinaryTcDetected)
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? uINTEGER.decode(data.apid)
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    lastUpdateModeBinProfile: (data.lastUpdateModeBinProfile !== null && typeof data.lastUpdateModeBinProfile !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeBinProfile)
      : undefined,
    lastUpdateTimeBinProfile: (data.lastUpdateTimeBinProfile !== null && typeof data.lastUpdateTimeBinProfile !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeBinProfile)
      : undefined,
    lastUpdateModeGroundStatus: (data.lastUpdateModeGroundStatus !== null && typeof data.lastUpdateModeGroundStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeGroundStatus)
      : undefined,
    lastUpdateTimeGroundStatus: (data.lastUpdateTimeGroundStatus !== null && typeof data.lastUpdateTimeGroundStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeGroundStatus)
      : undefined,
    lastUpdateModeStatus: (data.lastUpdateModeStatus !== null && typeof data.lastUpdateModeStatus !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeStatus)
      : undefined,
    lastUpdateTimeStatus: (data.lastUpdateTimeStatus !== null && typeof data.lastUpdateTimeStatus !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeStatus)
      : undefined,
    lastUpdateModeInitExecTime: (data.lastUpdateModeInitExecTime !== null && typeof data.lastUpdateModeInitExecTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeInitExecTime)
      : undefined,
    lastUpdateTimeInitExecTime: (data.lastUpdateTimeInitExecTime !== null && typeof data.lastUpdateTimeInitExecTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeInitExecTime)
      : undefined,
    lastUpdateModeTotalShiftOffset: (data.lastUpdateModeTotalShiftOffset !== null && typeof data.lastUpdateModeTotalShiftOffset !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeTotalShiftOffset)
      : undefined,
    lastUpdateTimeCurrExecTime: (data.lastUpdateTimeCurrExecTime !== null && typeof data.lastUpdateTimeCurrExecTime !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCurrExecTime)
      : undefined,
    lastUpdateModeCurrExecTime: (data.lastUpdateModeCurrExecTime !== null && typeof data.lastUpdateModeCurrExecTime !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCurrExecTime)
      : undefined,
    lastUpdateTimeTotalShiftOffset: (data.lastUpdateTimeTotalShiftOffset !== null && typeof data.lastUpdateTimeTotalShiftOffset !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeTotalShiftOffset)
      : undefined,
    lastUpdateModeCommandId: (data.lastUpdateModeCommandId !== null && typeof data.lastUpdateModeCommandId !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateModeCommandId)
      : undefined,
    lastUpdateTimeCommandId: (data.lastUpdateTimeCommandId !== null && typeof data.lastUpdateTimeCommandId !== 'undefined')
      ? tIME.decode(data.lastUpdateTimeCommandId)
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
