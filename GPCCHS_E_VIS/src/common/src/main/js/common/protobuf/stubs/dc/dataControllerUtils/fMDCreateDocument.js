const protobuf = require('../../../index');
const applyOverride = require('../../applyOverride');

const { getFMDDocumentProperty } = require('./fMDDocumentProperty');

const getFMDCreateDocument = override => applyOverride({
  name: 'myDocument',
  path: '/my/path/to/heaven',
  mimeType: '.doc',
  domainId: 3,
  properties: [getFMDDocumentProperty(), getFMDDocumentProperty()],
}, override);

const getFMDCreateDocumentProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.FMDCreateDocument',
  getFMDCreateDocument(override)
);

module.exports = {
  getFMDCreateDocument,
  getFMDCreateDocumentProtobuf,
};
