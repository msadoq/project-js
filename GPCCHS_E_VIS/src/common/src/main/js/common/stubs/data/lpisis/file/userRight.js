// Generated file
const applyOverride = require('../../applyOverride');
const getUser = require('../ccsds_cs/user');

module.exports = override => applyOverride({
  read: true,
  changeAccessRight: true,
  write: true,
  user: getUser(),
}, override);

