// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getUser = require('../ccsds_cs/user');

module.exports = override => applyOverride({
  read: true,
  changeAccessRight: true,
  write: true,
  profile: getUser(),
}, override);

