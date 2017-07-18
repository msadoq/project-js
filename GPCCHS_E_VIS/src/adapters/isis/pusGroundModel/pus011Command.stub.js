// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus011CommandParameter = require('./pus011CommandParameter.stub');
const getPus011EncapsulatingTc = require('./pus011EncapsulatingTc.stub');
const getPus011TimeShift = require('./pus011TimeShift.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus011Command = {
  commandApid: 100,
  commandBinaryProfile: Buffer.alloc(4, 1),
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
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011Command) : pus011Command);
