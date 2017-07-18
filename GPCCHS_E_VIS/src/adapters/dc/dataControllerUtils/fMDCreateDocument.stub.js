const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./fMDCreateDocument');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/FMDCreateDocument.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.FMDCreateDocument');

const { getFMDDocumentProperty } = require('./fMDDocumentProperty.stub');

const getFMDCreateDocument = override => applyOverride({
  name: 'myDocument',
  path: '/my/path/to/heaven',
  mimeType: '.doc',
  domainId: 3,
  properties: [getFMDDocumentProperty(), getFMDDocumentProperty()],
}, override);

const getFMDCreateDocumentProtobuf = override => Builder.encode(Adapter.encode(getFMDCreateDocument(override))).finish();

module.exports = {
  getFMDCreateDocument,
  getFMDCreateDocumentProtobuf,
};
