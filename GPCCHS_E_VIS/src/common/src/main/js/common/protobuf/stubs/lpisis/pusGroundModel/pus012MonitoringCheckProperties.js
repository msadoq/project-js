// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');


module.exports = override => applyOverride({
  ridStatus: 100,
  actionStatus: 100,
  value: _random(1, 100, true),
  rid: 100,
  mask: 'mySTRING',
  actionName: 'mySTRING',
}, override);

