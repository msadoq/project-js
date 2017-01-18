// Generated file
const applyOverride = require('../../applyOverride');
const getCollectionDocument = require('./collectionDocument');
const getCollectionVirtualFolder = require('./collectionVirtualFolder');
const getProfileRight = require('./profileRight');
const getUser = require('../ccsds_cs/user');
const getUserRight = require('./userRight');

module.exports = override => applyOverride({
  collectionName: 'mySTRING',
  collectionDirname: 'myURI',
  virtualName: 'mySTRING',
  isVirtualFolder: true,
  collectionRefForVf: -1000,
  documents: [getCollectionDocument(), getCollectionDocument()],
  virtualFolders: [getCollectionVirtualFolder(), getCollectionVirtualFolder()],
  profilesAccess: [getProfileRight(), getProfileRight()],
  usersAccess: [getUserRight(), getUserRight()],
  user: getUser(),
  lockedBy: getUser(),
}, override);

