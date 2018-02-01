// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// VERSION : 1.1.2 : FA : #7434 : 22/08/2017 : Update FMD create document test and stub
// VERSION : 1.1.2 : FA : #7434 : 25/08/2017 : Rollback remove '/' on FMD create document
// END-HISTORY
// ====================================================================

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
