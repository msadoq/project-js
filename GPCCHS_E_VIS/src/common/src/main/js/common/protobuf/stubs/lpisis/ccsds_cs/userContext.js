// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  userId: -1000,
  currentProfileId: -1000,
  userContextTime: now,
}, override);

