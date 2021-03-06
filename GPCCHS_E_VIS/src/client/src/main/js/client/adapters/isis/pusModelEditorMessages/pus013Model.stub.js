// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus013Ldt = require('./pus013Ldt.stub');

const pus013Model = {
  pUS013UplinkLdt: [getPus013Ldt(), getPus013Ldt()],
  pUS013DownlinkLdt: [getPus013Ldt(), getPus013Ldt()],
  serviceApid: 100,
  status: 'mySTRING',
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus013Model) : pus013Model);
