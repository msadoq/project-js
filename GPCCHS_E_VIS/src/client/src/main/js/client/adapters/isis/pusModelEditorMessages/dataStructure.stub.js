// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const dataStructure = {
  dataType: 100,
  groundDate: now,
  payload: Buffer.alloc(4, 1),
};

module.exports = override => (override ? _defaultsDeep({}, override, dataStructure) : dataStructure);
