// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getCollectionDocument = require('./collectionDocument.stub');
const getCollectionVirtualFolder = require('./collectionVirtualFolder.stub');
const getProfileRight = require('./profileRight.stub');
const getUser = require('../ccsds_cs/user.stub');
const getUserRight = require('./userRight.stub');

const collection = {
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
};

module.exports = override => (override ? _defaultsDeep({}, override, collection) : collection);
