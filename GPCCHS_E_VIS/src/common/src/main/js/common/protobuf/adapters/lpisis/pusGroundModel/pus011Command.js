// Produced by Acceleo JavaScript Generator 1.1.0
const _map = require('lodash/map');
const pus011CommandParameter = require('./pus011CommandParameter');
const pus011EncapsulatingTc = require('./pus011EncapsulatingTc');
const pus011TimeShift = require('./pus011TimeShift');
const pusElement = require('./pusElement');

module.exports = {
  encode: data => ({
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? { value: data.commandApid }
      : null,
    commandBinaryProfile: (data.commandBinaryProfile !== null && typeof data.commandBinaryProfile !== 'undefined')
      ? { value: data.commandBinaryProfile }
      : null,
    commandGroundStatus: (data.commandGroundStatus !== null && typeof data.commandGroundStatus !== 'undefined')
      ? { value: data.commandGroundStatus }
      : null,
    commandName: (data.commandName !== null && typeof data.commandName !== 'undefined')
      ? { value: data.commandName }
      : null,
    commandSequenceCount: (data.commandSequenceCount !== null && typeof data.commandSequenceCount !== 'undefined')
      ? { value: data.commandSequenceCount }
      : null,
    commandStatus: (data.commandStatus !== null && typeof data.commandStatus !== 'undefined')
      ? { value: data.commandStatus }
      : null,
    currentExecutionTime: (data.currentExecutionTime !== null && typeof data.currentExecutionTime !== 'undefined')
      ? { value: data.currentExecutionTime }
      : null,
    initialExecutionTime: (data.initialExecutionTime !== null && typeof data.initialExecutionTime !== 'undefined')
      ? { value: data.initialExecutionTime }
      : null,
    commandSourceId: (data.commandSourceId !== null && typeof data.commandSourceId !== 'undefined')
      ? { value: data.commandSourceId }
      : null,
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? { value: data.ssId }
      : null,
    totalTimeShiftOffset: (data.totalTimeShiftOffset !== null && typeof data.totalTimeShiftOffset !== 'undefined')
      ? { value: data.totalTimeShiftOffset }
      : null,
    pus011EncapsulatingTc: (data.pus011EncapsulatingTc !== null && typeof data.pus011EncapsulatingTc !== 'undefined')
      ? pus011EncapsulatingTc.encode(data.pus011EncapsulatingTc)
      : null,
    pus011CommandParameters: _map(data.pus011CommandParameters, d => (pus011CommandParameter.encode(d))),
    pUS011TimeShift: _map(data.pUS011TimeShift, d => (pus011TimeShift.encode(d))),
    invalidBinaryTcDetected: (data.invalidBinaryTcDetected !== null && typeof data.invalidBinaryTcDetected !== 'undefined')
      ? { value: data.invalidBinaryTcDetected }
      : null,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { value: data.apid }
      : null,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.encode(data.pusElement)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { value: data.groundDate }
      : null,
  }),
  decode: data => ({
    commandApid: (data.commandApid !== null && typeof data.commandApid !== 'undefined')
      ? { type: 'uinteger', value: data.commandApid.value }
      : undefined,
    commandBinaryProfile: (data.commandBinaryProfile !== null && typeof data.commandBinaryProfile !== 'undefined')
      ? { type: 'blob', value: data.commandBinaryProfile.value.toBuffer() }
      : undefined,
    commandGroundStatus: (data.commandGroundStatus !== null && typeof data.commandGroundStatus !== 'undefined')
      ? { type: 'uinteger', value: data.commandGroundStatus.value }
      : undefined,
    commandName: (data.commandName !== null && typeof data.commandName !== 'undefined')
      ? { type: 'string', value: data.commandName.value }
      : undefined,
    commandSequenceCount: (data.commandSequenceCount !== null && typeof data.commandSequenceCount !== 'undefined')
      ? { type: 'uinteger', value: data.commandSequenceCount.value }
      : undefined,
    commandStatus: (data.commandStatus !== null && typeof data.commandStatus !== 'undefined')
      ? { type: 'uinteger', value: data.commandStatus.value }
      : undefined,
    currentExecutionTime: (data.currentExecutionTime !== null && typeof data.currentExecutionTime !== 'undefined')
      ? { type: 'time', value: data.currentExecutionTime.value.toNumber() }
      : undefined,
    initialExecutionTime: (data.initialExecutionTime !== null && typeof data.initialExecutionTime !== 'undefined')
      ? { type: 'time', value: data.initialExecutionTime.value.toNumber() }
      : undefined,
    commandSourceId: (data.commandSourceId !== null && typeof data.commandSourceId !== 'undefined')
      ? { type: 'uinteger', value: data.commandSourceId.value }
      : undefined,
    ssId: (data.ssId !== null && typeof data.ssId !== 'undefined')
      ? { type: 'uinteger', value: data.ssId.value }
      : undefined,
    totalTimeShiftOffset: (data.totalTimeShiftOffset !== null && typeof data.totalTimeShiftOffset !== 'undefined')
      ? { type: 'integer', value: data.totalTimeShiftOffset.value }
      : undefined,
    pus011EncapsulatingTc: (data.pus011EncapsulatingTc !== null && typeof data.pus011EncapsulatingTc !== 'undefined')
      ? pus011EncapsulatingTc.decode(data.pus011EncapsulatingTc)
      : undefined,
    pus011CommandParameters: _map(data.pus011CommandParameters, d => (pus011CommandParameter.decode(d))),
    pUS011TimeShift: _map(data.pUS011TimeShift, d => (pus011TimeShift.decode(d))),
    invalidBinaryTcDetected: (data.invalidBinaryTcDetected !== null && typeof data.invalidBinaryTcDetected !== 'undefined')
      ? { type: 'boolean', value: data.invalidBinaryTcDetected.value }
      : undefined,
    apid: (data.apid !== null && typeof data.apid !== 'undefined')
      ? { type: 'uinteger', value: data.apid.value }
      : undefined,
    pusElement: (data.pusElement !== null && typeof data.pusElement !== 'undefined')
      ? pusElement.decode(data.pusElement)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? { type: 'time', value: data.groundDate.value.toNumber() }
      : undefined,
    referenceTimestamp: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
        ? { type: 'time', value: data.groundDate.value.toNumber() }
        : undefined,
  }),
};

