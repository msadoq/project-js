// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const collectionDocument = require('./collectionDocument');
const collectionVirtualFolder = require('./collectionVirtualFolder');
const lONG = require('../ccsds_mal/lONG');
const namedValue = require('../ccsds_mal/namedValue');
const sTRING = require('../ccsds_mal/sTRING');
const uRI = require('../ccsds_mal/uRI');
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
    usersAccess: (data.usersAccess !== null && typeof data.usersAccess !== 'undefined')
      ? userRight.encode(data.usersAccess)
      : null,
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? sTRING.encode(data.lockedBy)
      : null,
    properties: _map(data.properties, d => (namedValue.encode(d))),
    creatorUser: (data.creatorUser !== null && typeof data.creatorUser !== 'undefined')
      ? sTRING.encode(data.creatorUser)
      : null,
    accessRightsPropagation: (data.accessRightsPropagation !== null && typeof data.accessRightsPropagation !== 'undefined')
      ? bOOLEAN.encode(data.accessRightsPropagation)
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
    usersAccess: (data.usersAccess !== null && typeof data.usersAccess !== 'undefined')
      ? userRight.decode(data.usersAccess)
      : undefined,
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? sTRING.decode(data.lockedBy)
      : undefined,
    properties: _map(data.properties, d => (namedValue.decode(d))),
    creatorUser: (data.creatorUser !== null && typeof data.creatorUser !== 'undefined')
      ? sTRING.decode(data.creatorUser)
      : undefined,
    accessRightsPropagation: (data.accessRightsPropagation !== null && typeof data.accessRightsPropagation !== 'undefined')
      ? bOOLEAN.decode(data.accessRightsPropagation)
      : undefined,
  }),
};
