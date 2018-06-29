const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemMetadata');
const { getADEItemAlgorithm } = require('./ADEItemAlgorithm.stub');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEItemMetadata.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEItemMetadata');

const getADEItemMetadata = override => applyOverride({
  itemName: 'inem',
  comment: undefined,
  longDescription: undefined,
  shortDescription: undefined,
  unit: undefined,
  algorithm: getADEItemAlgorithm(),
}, override);

const getADEItemMetadataProtobuf = override => {
  const toEncode = getADEItemMetadata(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEItemMetadata,
  getADEItemMetadataProtobuf,
};
