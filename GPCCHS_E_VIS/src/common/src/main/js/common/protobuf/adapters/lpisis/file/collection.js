// Generated file
const _map = require('lodash/map');
const collectionDocument = require('./collectionDocument');
const collectionVirtualFolder = require('./collectionVirtualFolder');
const profileRight = require('./profileRight');
const protobuf = require('../../../');
const userRight = require('./userRight');
const {
  stringToBytes,
  bytesToString,

} = require('../types');

module.exports = {
  encode: data => ({
    collectionName: (data.collectionName !== null && typeof data.collectionName !== 'undefined')
      ? { value: data.collectionName }
      : null,
    collectionDirname: (data.collectionDirname !== null && typeof data.collectionDirname !== 'undefined')
      ? { value: stringToBytes(data.collectionDirname) }
      : null,
    virtualName: (data.virtualName !== null && typeof data.virtualName !== 'undefined')
      ? { value: data.virtualName }
      : null,
    isVirtualFolder: (data.isVirtualFolder !== null && typeof data.isVirtualFolder !== 'undefined')
      ? { value: data.isVirtualFolder }
      : null,
    collectionRefForVf: (data.collectionRefForVf !== null && typeof data.collectionRefForVf !== 'undefined')
      ? { value: data.collectionRefForVf }
      : null,
    documents: _map(data.documents, d => (collectionDocument.encode(d))),
    virtualFolders: _map(data.virtualFolders, d => (collectionVirtualFolder.encode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.encode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.encode(d))),
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? { value: protobuf.encode('lpisis.ccsds_cs.User', data.user) }
      : null,
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? { value: protobuf.encode('lpisis.ccsds_cs.User', data.lockedBy) }
      : null,
  }),
  decode: data => ({
    collectionName: (data.collectionName !== null && typeof data.collectionName !== 'undefined')
      ? { type: 'string', value: data.collectionName.value }
      : undefined,
    collectionDirname: (data.collectionDirname !== null && typeof data.collectionDirname !== 'undefined')
      ? { type: 'uri', value: bytesToString(data.collectionDirname.value) }
      : undefined,
    virtualName: (data.virtualName !== null && typeof data.virtualName !== 'undefined')
      ? { type: 'string', value: data.virtualName.value }
      : undefined,
    isVirtualFolder: (data.isVirtualFolder !== null && typeof data.isVirtualFolder !== 'undefined')
      ? { type: 'boolean', value: data.isVirtualFolder.value }
      : undefined,
    collectionRefForVf: (data.collectionRefForVf !== null && typeof data.collectionRefForVf !== 'undefined')
      ? { type: 'long', symbol: data.collectionRefForVf.value.toString() }
      : undefined,
    documents: _map(data.documents, d => (collectionDocument.decode(d))),
    virtualFolders: _map(data.virtualFolders, d => (collectionVirtualFolder.decode(d))),
    profilesAccess: _map(data.profilesAccess, d => (profileRight.decode(d))),
    usersAccess: _map(data.usersAccess, d => (userRight.decode(d))),
    user: (data.user !== null && typeof data.user !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.User', data.user.value)
      : undefined,
    lockedBy: (data.lockedBy !== null && typeof data.lockedBy !== 'undefined')
      ? protobuf.decode('lpisis.ccsds_cs.User', data.lockedBy.value)
      : undefined,
  }),
};
