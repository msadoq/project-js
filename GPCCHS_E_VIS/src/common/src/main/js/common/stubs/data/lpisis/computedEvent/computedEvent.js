// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');
const getProvider = require('../ccsds_cs/provider');

const now = _now();

module.exports = override => applyOverride({
  eventDate: now,
  systemDate: now,
  eventClass: 0,
  mission: 'mySTRING',
  origin: 'mySTRING',
  specificAttributes: [getNamedValue(), getNamedValue()],
  satellite: 1000,
  producer: getProvider(),
}, override);

