const JS = require('../protoFile/folder.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Folder = JS.Folder;

exports.binToJson = (payload) => {
  const decoded = Folder.decode(payload);
  const folder = {
    profilesAccess: decoded.profilesAccess.value,    usersAccess: decoded.usersAccess.value,    path: decoded.path.value
  };
  return folder;
};
