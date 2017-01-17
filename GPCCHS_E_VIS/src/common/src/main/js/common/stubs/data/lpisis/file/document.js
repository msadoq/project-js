// Generated file
const applyOverride = require('../../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue');
const getProfileRight = require('./profileRight');
const getUser = require('../ccsds_cs/user');
const getUserRight = require('./userRight');

module.exports = override => applyOverride({
  lockedBy: getUser(),
  dirname: Buffer('myURI'),
  properties: [getNamedValue(), getNamedValue()],
  usersAccess: [getUserRight(), getUserRight()],
  profilesAccess: [getProfileRight(), getProfileRight()],
  basename: 'mySTRING',
  confidentiality: 1,
}, override);

