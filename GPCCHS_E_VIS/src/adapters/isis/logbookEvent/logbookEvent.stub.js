// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getProvider = require('../ccsds_cs/provider.stub');
const getUser = require('../ccsds_cs/user.stub');

const now = _now();

module.exports = override => applyOverride({
  eventDate: now,
  systemDate: now,
  user: getUser(),
  specificAttributes: [getNamedValue(), getNamedValue()],
  mission: 'mySTRING',
  satellite: 1000,
  producer: getProvider(),
}, override);
