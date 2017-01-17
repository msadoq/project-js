// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');

const now = _now();

module.exports = override => applyOverride({
  launchingParameter: [getNamedValue(), getNamedValue()],
  launchingTime: now,
}, override);

