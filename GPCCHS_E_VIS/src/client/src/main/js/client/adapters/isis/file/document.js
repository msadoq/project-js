// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const namedValue = require('../ccsds_mal/namedValue');
const profileRight = require('./profileRight');
const sTRING = require('../ccsds_mal/sTRING');
const uOCTET = require('../ccsds_mal/uOCTET');
const uRI = require('../ccsds_mal/uRI');
const user = require('../ccsds_cs/user');
const userRight = require('./userRight');

module.exports = {
  encode: data => ({
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.lockedBy))
      : null,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? uRI.encode(data.dirname)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? sTRING.encode(data.basename)
      : null,
    confidentiality: (data.confidentiality !== null && typeof data.confidentiality !== 'undefined')
      ? uOCTET.encode(data.confidentiality)
      : null,
  }),
  decode: data => ({
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.lockedBy).value)
      : undefined,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? uRI.decode(data.dirname)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? sTRING.decode(data.basename)
      : undefined,
    confidentiality: (data.confidentiality !== null && typeof data.confidentiality !== 'undefined')
      ? uOCTET.decode(data.confidentiality)
      : undefined,
  }),
};
