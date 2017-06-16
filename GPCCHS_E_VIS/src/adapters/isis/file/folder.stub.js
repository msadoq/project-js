// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const applyOverride = require('../applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getProfileRight = require('./profileRight.stub');
const getUserRight = require('./userRight.stub');

module.exports = override => applyOverride({
  profilesAccess: [getProfileRight(), getProfileRight()],
  usersAccess: [getUserRight(), getUserRight()],
  path: 'myURI',
  properties: [getNamedValue(), getNamedValue()],
}, override);
