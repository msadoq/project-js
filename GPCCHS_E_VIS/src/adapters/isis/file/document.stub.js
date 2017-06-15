// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const applyOverride = require('../../../protobuf/utils/applyOverride');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getProfileRight = require('./profileRight.stub');
const getUser = require('../ccsds_cs/user.stub');
const getUserRight = require('./userRight.stub');

module.exports = override => applyOverride({
  lockedBy: getUser(),
  dirname: 'myURI',
  properties: [getNamedValue(), getNamedValue()],
  usersAccess: [getUserRight(), getUserRight()],
  profilesAccess: [getProfileRight(), getProfileRight()],
  basename: 'mySTRING',
  confidentiality: 1,
}, override);
