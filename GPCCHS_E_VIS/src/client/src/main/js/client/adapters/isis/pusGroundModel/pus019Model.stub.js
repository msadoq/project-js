// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus019EventAction = require('./pus019EventAction.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus019Model = {
  serviceStatus: 100,
  noOfEventActions: 100,
  pus19EventAction: [getPus019EventAction(), getPus019EventAction()],
  groundDate: now,
  apid: 100,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus019Model) : pus019Model);
