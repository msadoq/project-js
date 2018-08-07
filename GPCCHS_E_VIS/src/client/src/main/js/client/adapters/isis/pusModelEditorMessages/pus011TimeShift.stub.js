// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus011TimeShift = {
  applicationTime: 'mySTRING',
  timeShiftOffset: -100,
  lastUpdateMode: 100,
  lastUpdateTime: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011TimeShift) : pus011TimeShift);
