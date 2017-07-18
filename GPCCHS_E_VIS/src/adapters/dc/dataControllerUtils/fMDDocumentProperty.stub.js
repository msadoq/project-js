const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./fMDDocumentProperty');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/FMDDocumentProperty.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.FMDDocumentProperty');


const getFMDDocumentProperty = override => applyOverride({
  key: 'myKey',
  value: 'myValue',
}, override);

const getFMDDocumentPropertyProtobuf = override => Builder.encode(Adapter.encode(getFMDDocumentProperty(override))).finish();

module.exports = {
  getFMDDocumentProperty,
  getFMDDocumentPropertyProtobuf,
};
