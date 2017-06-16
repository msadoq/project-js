// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue.stub');

const now = _now();

module.exports = override => applyOverride({
  launchingParameter: [getNamedValue(), getNamedValue()],
  launchingTime: now,
}, override);
