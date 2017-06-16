// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const _now = require('lodash/now');
const getUser = require('../ccsds_cs/user.stub');
const applyOverride = require('../applyOverride');

const now = _now();

module.exports = override => applyOverride({
  ackDate: now,
  acknowledger: getUser,
}, override );
