const JS = require('../protoFile/docVersion.proto.js');
const { getAttributeValue } = require('../lib/utils.js');

const DocVersion = JS.DocVersion;

exports.binToJson = (payload) => {
  const decoded = DocVersion.decode(payload);
  const docVersion = {
    externalVersion: decoded.externalVersion.value,    internalVersion: decoded.internalVersion.value,    properties: decoded.properties.value,    content: getAttributeValue(decoded.content)
  };
  return docVersion;
};
