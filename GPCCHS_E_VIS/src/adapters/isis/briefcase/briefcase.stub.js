// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getBriefcaseContent = require('./briefcaseContent.stub');

const now = _now();

const briefcase = {
  uid: -1000,
  timestamp: now,
  base: getBriefcaseContent(),
};

module.exports = override => (override ? _defaultsDeep({}, override, briefcase) : briefcase);
