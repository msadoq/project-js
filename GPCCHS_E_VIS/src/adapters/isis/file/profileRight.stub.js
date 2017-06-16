// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const applyOverride = require('../applyOverride');
const getUser = require('../ccsds_cs/user.stub');

module.exports = override => applyOverride({
  read: true,
  changeAccessRight: true,
  write: true,
  profile: getUser(),
}, override);
