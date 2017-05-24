// Produced by Acceleo JavaScript Generator 1.1.0
const applyOverride = require('../../applyOverride');
const getProfileRight = require('./profileRight');
const getUserRight = require('./userRight');

module.exports = override => applyOverride({
  profilesAccess: [getProfileRight(), getProfileRight()],
  usersAccess: [getUserRight(), getUserRight()],
  path: 'myURI',
}, override);

