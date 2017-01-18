// Generated file
const applyOverride = require('../../applyOverride');
const getProfileRight = require('./profileRight');
const getUserRight = require('./userRight');

module.exports = override => applyOverride({
  profilesAccess: [getProfileRight(), getProfileRight()],
  usersAccess: [getUserRight(), getUserRight()],
  path: 'myURI',
}, override);

