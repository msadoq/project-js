// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const collectionDocument = require('./collectionDocument');
const collectionVirtualFolder = require('./collectionVirtualFolder');
const lONG = require('../ccsds_mal/lONG');
const profileRight = require('./profileRight');
const sTRING = require('../ccsds_mal/sTRING');
const uRI = require('../ccsds_mal/uRI');
const user = require('../ccsds_cs/user');
const userRight = require('./userRight');

module.exports = {
  encode: data => ({
    collectionName: (data.collectionName !== null && typeof data.collectionName !== 'undefined')
      ? sTRING.encode(data.collectionName)
      : null,
    collectionDirname: (data.collectionDirname !== null && typeof data.collectionDirname !== 'undefined')
      ? uRI.encode(data.collectionDirname)
      : null,
    virtualName: (data.virtualName !== null && typeof data.virtualName !== 'undefined')
      ? sTRING.encode(data.virtualName)
      : null,
    isVirtualFolder: (data.isVirtualFolder !== null && typeof data.isVirtualFolder !== 'undefined')
      ? bOOLEAN.encode(data.isVirtualFolder)
      : null,
    collectionRefForVf: (data.collectionRefForVf !== null && typeof data.collectionRefForVf !== 'undefined')
      ? lONG.encode(data.collectionRefForVf)
      : null,
    documents: _map(data.documents, d => (collectionDocument.encode(d))),
    virtualFolders: _map(data.virtualFolders, d => (collectionVirtualFolder.encode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.user))
      : null,
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? bLOB.encode(user.encodeRaw(data.lockedBy))
      : null,
  }),
  decode: data => ({
    collectionName: (data.collectionName !== null && typeof data.collectionName !== 'undefined')
      ? sTRING.decode(data.collectionName)
      : undefined,
    collectionDirname: (data.collectionDirname !== null && typeof data.collectionDirname !== 'undefined')
      ? uRI.decode(data.collectionDirname)
      : undefined,
    virtualName: (data.virtualName !== null && typeof data.virtualName !== 'undefined')
      ? sTRING.decode(data.virtualName)
      : undefined,
    isVirtualFolder: (data.isVirtualFolder !== null && typeof data.isVirtualFolder !== 'undefined')
      ? bOOLEAN.decode(data.isVirtualFolder)
      : undefined,
    collectionRefForVf: (data.collectionRefForVf !== null && typeof data.collectionRefForVf !== 'undefined')
      ? lONG.decode(data.collectionRefForVf)
      : undefined,
    documents: _map(data.documents, d => (collectionDocument.decode(d))),
    virtualFolders: _map(data.virtualFolders, d => (collectionVirtualFolder.decode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.user).value)
      : undefined,
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? user.decodeRaw(bLOB.decode(data.lockedBy).value)
      : undefined,
  }),
};
