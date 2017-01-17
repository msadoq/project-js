// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  timeStamp: now + 1,
  name: 'mySTRING',
  value: 1.1,
}, override);

