const JS = require('../protoFile/document.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const Document = JS.Document;

exports.binToJson = (payload) => {
  const decoded = Document.decode(payload);
  const document = {
,    dirname: decoded.dirname.value,    properties: decoded.properties.value,    usersAccess: decoded.usersAccess.value,    profilesAccess: decoded.profilesAccess.value,    basename: decoded.basename.value,    confidentiality: decoded.confidentiality.value
  };
  return document;
};
