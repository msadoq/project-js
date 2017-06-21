// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getUCPParameter = require('./uCPParameter.stub');

const now = _now();

const uCPReport = {
  date: now,
  parameters: [getUCPParameter(), getUCPParameter()],
};

module.exports = override => (override ? _defaultsDeep({}, override, uCPReport) : uCPReport);
