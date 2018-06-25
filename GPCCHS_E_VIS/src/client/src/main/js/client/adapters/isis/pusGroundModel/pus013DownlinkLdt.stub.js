// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus013Ldt = require('./pus013Ldt.stub');

const now = _now();

const pus013DownlinkLdt = {
  receptionTimerArmed: true,
  receptionTimerDeadline: now,
  groundDate: -1000,
  pus013Ldt: getPus013Ldt(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013DownlinkLdt) : pus013DownlinkLdt);
