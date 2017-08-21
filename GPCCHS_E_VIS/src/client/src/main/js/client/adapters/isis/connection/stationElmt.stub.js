// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getFlowConfiguration = require('./flowConfiguration.stub');

const stationElmt = {
  stationId: 'mySTRING',
  configuration: getFlowConfiguration(),
};

module.exports = override => (override ? _defaultsDeep({}, override, stationElmt) : stationElmt);
