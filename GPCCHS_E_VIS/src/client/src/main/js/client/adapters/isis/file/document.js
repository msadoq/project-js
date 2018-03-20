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
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uRI = require('../ccsds_mal/uRI');
const userRight = require('./userRight');

module.exports = {
  encode: data => ({
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? sTRING.encode(data.lockedBy)
      : null,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? uRI.encode(data.dirname)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    usersAccess: (data.usersAccess !== null && typeof data.usersAccess !== 'undefined')
      ? userRight.encode(data.usersAccess)
      : null,
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? sTRING.encode(data.basename)
      : null,
    creatorUser: (data.creatorUser !== null && typeof data.creatorUser !== 'undefined')
      ? sTRING.encode(data.creatorUser)
      : null,
    filesize: (data.filesize !== null && typeof data.filesize !== 'undefined')
      ? uINTEGER.encode(data.filesize)
      : null,
  }),
  decode: data => ({
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? sTRING.decode(data.lockedBy)
      : undefined,
    dirname: (data.dirname !== null && typeof data.dirname !== 'undefined')
      ? uRI.decode(data.dirname)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    usersAccess: (data.usersAccess !== null && typeof data.usersAccess !== 'undefined')
      ? userRight.decode(data.usersAccess)
      : undefined,
    basename: (data.basename !== null && typeof data.basename !== 'undefined')
      ? sTRING.decode(data.basename)
      : undefined,
    creatorUser: (data.creatorUser !== null && typeof data.creatorUser !== 'undefined')
      ? sTRING.decode(data.creatorUser)
      : undefined,
    filesize: (data.filesize !== null && typeof data.filesize !== 'undefined')
      ? uINTEGER.decode(data.filesize)
      : undefined,
  }),
};
