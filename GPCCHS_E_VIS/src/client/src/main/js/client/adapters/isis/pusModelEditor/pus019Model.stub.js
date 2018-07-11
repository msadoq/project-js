// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus019EventAction = require('./pus019EventAction.stub');

const now = _now();

const pus019Model = {
  serviceStatus: 100,
  pus19EventAction: [getPus019EventAction(), getPus019EventAction()],
  groundDate: now,
  status: 100,
  lastUpdateModeServiceStatus: 100,
  lastUpdateTimeServiceStatus: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus019Model) : pus019Model);
