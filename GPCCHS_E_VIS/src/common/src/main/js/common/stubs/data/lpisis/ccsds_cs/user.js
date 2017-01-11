const applyOverride = require('../../applyOverride');

const _now = require('lodash/now');

const now = _now();

module.exports = override => applyOverride({
  login: 'myLogin',
  password: 'myPassword',
  profile: 'myProfile',
  userTime: now,
}, override);
