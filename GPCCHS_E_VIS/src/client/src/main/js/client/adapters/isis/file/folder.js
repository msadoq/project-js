// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const lONG = require('../ccsds_mal/lONG');
const namedValue = require('../ccsds_mal/namedValue');
const sTRING = require('../ccsds_mal/sTRING');
const uRI = require('../ccsds_mal/uRI');
const userRight = require('./userRight');

module.exports = {
  encode: data => ({
    usersAccess: (data.usersAccess !== null && typeof data.usersAccess !== 'undefined')
      ? userRight.encode(data.usersAccess)
      : null,
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? uRI.encode(data.path)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    creatorUser: (data.creatorUser !== null && typeof data.creatorUser !== 'undefined')
      ? sTRING.encode(data.creatorUser)
      : null,
    documentCount: (data.documentCount !== null && typeof data.documentCount !== 'undefined')
      ? lONG.encode(data.documentCount)
      : null,
    accessRightsPropagation: (data.accessRightsPropagation !== null && typeof data.accessRightsPropagation !== 'undefined')
      ? bOOLEAN.encode(data.accessRightsPropagation)
      : null,
  }),
  decode: data => ({
    usersAccess: (data.usersAccess !== null && typeof data.usersAccess !== 'undefined')
      ? userRight.decode(data.usersAccess)
      : undefined,
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? uRI.decode(data.path)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    creatorUser: (data.creatorUser !== null && typeof data.creatorUser !== 'undefined')
      ? sTRING.decode(data.creatorUser)
      : undefined,
    documentCount: (data.documentCount !== null && typeof data.documentCount !== 'undefined')
      ? lONG.decode(data.documentCount)
      : undefined,
    accessRightsPropagation: (data.accessRightsPropagation !== null && typeof data.accessRightsPropagation !== 'undefined')
      ? bOOLEAN.decode(data.accessRightsPropagation)
      : undefined,
  }),
};
