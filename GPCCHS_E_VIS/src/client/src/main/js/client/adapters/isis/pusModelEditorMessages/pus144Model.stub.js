// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus144OnboardFile = require('./pus144OnboardFile.stub');

const pus144Model = {
  pus144OnboardFiles: [getPus144OnboardFile(), getPus144OnboardFile()],
  status: 100,
  uniqueId: 1000,
  serviceApid: 100,
  serviceApidName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus144Model) : pus144Model);
