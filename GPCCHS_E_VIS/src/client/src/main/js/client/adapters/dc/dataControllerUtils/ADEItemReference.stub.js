const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemReference');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEItemReference.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEItemReference');

const getADEItemReference = override => applyOverride({
  itemName: 'defaultItemReferenceName',
  catalogName: 'Reporting',
}, override);

const getADEItemReferenceProtobuf = override => {
  const toEncode = getADEItemReference(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEItemReference,
  getADEItemReferenceProtobuf,
};
