// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getParameter = require('./parameter.stub');

const now = _now();

const isisAggregation = {
  generationMode: 1,
  filtered: true,
  deltaTime: 42.5,
  intervalTime: 42.5,
  setIntervalTime: 42.5,
  onboardDate: now,
  groundDate: now,
  packetType: 1,
  apid: 10,
  service: 1,
  subService: 1,
  destinationId: 1,
  values: [getParameter(), getParameter()],
};

module.exports = override => (override ? _defaultsDeep({}, override, isisAggregation) : isisAggregation);
