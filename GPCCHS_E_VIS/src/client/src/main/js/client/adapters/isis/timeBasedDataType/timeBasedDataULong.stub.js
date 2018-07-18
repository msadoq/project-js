// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const timeBasedDataULong = {
  timeStamp: now + 1,
  name: 'mySTRING',
  value: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, timeBasedDataULong) : timeBasedDataULong);
