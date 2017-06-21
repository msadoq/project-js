// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const objectType = {
  area: 10,
  service: 10,
  version: 1,
  number: 10,
};

module.exports = override => (override ? _defaultsDeep({}, override, objectType) : objectType);
