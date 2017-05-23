// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');
const getProfileRight = require('./profileRight');
const getUser = require('../ccsds_cs/user');
const getUserRight = require('./userRight');

module.exports = override => applyOverride({
  lockedBy: getUser(),
  dirname: 'myURI',
  properties: [getNamedValue(), getNamedValue()],
  usersAccess: [getUserRight(), getUserRight()],
  profilesAccess: [getProfileRight(), getProfileRight()],
  basename: 'mySTRING',
  confidentiality: 1,
}, override);

