// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus018Obcp = require('./pus018Obcp.stub');

const now = _now();

const pus018Model = {
  engineStatus: 100,
  pus018Obcp: [getPus018Obcp(), getPus018Obcp()],
  groundDate: now,
  status: 100,
  lastUpdateModeEngineStatus: 100,
  lastUpdateTimeEngineStatus: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus018Model) : pus018Model);
