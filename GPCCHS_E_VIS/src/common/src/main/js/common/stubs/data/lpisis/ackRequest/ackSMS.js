// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  SystemCreationDate: now,
  ApplicationCreationDate: now,
}, override);

