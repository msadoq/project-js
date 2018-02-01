// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const namedValue = require('../ccsds_mal/namedValue');
const profileRight = require('./profileRight');
const uRI = require('../ccsds_mal/uRI');
const userRight = require('./userRight');

module.exports = {
  encode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? uRI.encode(data.path)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
  }),
  decode: data => ({
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? uRI.decode(data.path)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
  }),
};
