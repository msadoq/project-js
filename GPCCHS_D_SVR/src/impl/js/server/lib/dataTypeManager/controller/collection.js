const JS = require('../protoFile/collection.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Collection = JS.Collection;

exports.binToJson = (payload) => {
  const decoded = Collection.decode(payload);
  const collection = {
    collectionName: decoded.collectionName.value,    collectionDirname: decoded.collectionDirname.value,    virtualName: decoded.virtualName.value,    isVirtualFolder: decoded.isVirtualFolder.value,    collectionRefForVf: decoded.collectionRefForVf.value,    documents: decoded.documents.value,    virtualFolders: decoded.virtualFolders.value,    profilesAccess: decoded.profilesAccess.value,    usersAccess: decoded.usersAccess.value,,
  };
  return collection;
};
