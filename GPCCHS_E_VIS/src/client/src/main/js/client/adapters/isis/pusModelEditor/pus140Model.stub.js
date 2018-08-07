// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus140Parameter = require('./pus140Parameter.stub');

const pus140Model = {
  pus140Parameter: [getPus140Parameter(), getPus140Parameter()],
  status: 100,
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus140Model) : pus140Model);
