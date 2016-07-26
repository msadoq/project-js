const JS = require('../protoFile/collection.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Collection = JS.Collection;

exports.binToJson = (payload) => {
  const decoded = Collection.decode(payload);
  const collection = {
    collectionName: decoded.collectionName.value,    collectionDirname: decoded.collectionDirname.value,    isVirtualFolder: decoded.isVirtualFolder.value,    collectionRefForVf: decoded.collectionRefForVf.value,    documents: decoded.documents.value,    virtualFolders: decoded.virtualFolders.value,    profilesAccess: decoded.profilesAccess.value,    usersAccess: decoded.usersAccess.value,    user: decoded.user.value,    lockedBy: decoded.lockedBy.value
  };
  return collection;
};
