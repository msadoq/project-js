// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};
