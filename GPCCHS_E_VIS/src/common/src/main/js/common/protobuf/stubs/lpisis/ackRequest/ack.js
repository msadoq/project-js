// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getUser = require('../ccsds_cs/user');

const now = _now();

module.exports = override => applyOverride({
  ackDate: now,
  acknowledger: getUser(),
}, override);

