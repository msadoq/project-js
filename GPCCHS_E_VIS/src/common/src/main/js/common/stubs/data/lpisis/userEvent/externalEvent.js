// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');
const getProvider = require('../ccsds_cs/provider');

const now = _now();

module.exports = override => applyOverride({
  eventDate: now,
  systemDate: now,
  specificAttributes: [getNamedValue(), getNamedValue()],
  mission: 'mySTRING',
  satellite: 1000,
  producer: getProvider(),
}, override);

