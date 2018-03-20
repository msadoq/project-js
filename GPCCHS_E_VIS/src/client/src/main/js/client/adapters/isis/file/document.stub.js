// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getUserRight = require('./userRight.stub');

const document = {
  lockedBy: 'mySTRING',
  dirname: 'myURI',
  properties: [getNamedValue(), getNamedValue()],
  usersAccess: getUserRight(),
  basename: 'mySTRING',
  creatorUser: 'mySTRING',
  filesize: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, document) : document);
