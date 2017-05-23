// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus011CommandParameter = require('./pus011CommandParameter');
const getPus011EncapsulatingTc = require('./pus011EncapsulatingTc');
const getPus011TimeShift = require('./pus011TimeShift');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  commandApid: 100,
  commandBinaryProfile: Buffer.alloc(10, 1),
  commandGroundStatus: 100,
  commandName: 'mySTRING',
  commandSequenceCount: 100,
  commandStatus: 100,
  currentExecutionTime: now,
  initialExecutionTime: now,
  commandSourceId: 100,
  ssId: 100,
  totalTimeShiftOffset: -100,
  pus011EncapsulatingTc: getPus011EncapsulatingTc(),
  pus011CommandParameters: [getPus011CommandParameter(), getPus011CommandParameter()],
  pUS011TimeShift: [getPus011TimeShift(), getPus011TimeShift()],
  invalidBinaryTcDetected: true,
  apid: 100,
  pusElement: getPusElement(),
  groundDate: now,
}, override);

