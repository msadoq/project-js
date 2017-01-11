const applyOverride = require('../../applyOverride');

const getUser = require('../ccsds_cs/user');
const getNamedValue = require('../ccsds_mal/namedValue');
const getUserRight = require('./userRight');
const getProfileRight = require('./profileRight');

module.exports = override => applyOverride({
  lockedBy: getUser(),
  dirname: Buffer('myDirname'),
  properties: [getNamedValue(), getNamedValue()],
  usersAccess: [getUserRight(), getUserRight()],
  profilesAccess: [getProfileRight(), getProfileRight()],
  basename: 'myBaseName',
  confidentiality: 1,
}, override);
