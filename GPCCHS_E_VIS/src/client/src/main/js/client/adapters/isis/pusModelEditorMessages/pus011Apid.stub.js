// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus011Apid = {
  apid: 100,
  lastUpdateModeApid: 100,
  lastUpdateTimeApid: 'mySTRING',
  status: 100,
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  apidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011Apid) : pus011Apid);
