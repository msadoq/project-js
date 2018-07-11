const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemMetadata');
const { getADEItemAlgorithm } = require('./ADEItemAlgorithm.stub');
const { getADEItemMetadataTM } = require('./ADEItemMetadataTM.stub');
const { getAliasRecord } = require('./AliasRecord.stub');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEItemMetadata.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEItemMetadata');

const getADEItemMetadata = override => applyOverride({
  itemName: 'SAT_BC_NUMTC13',
  comment: undefined,
  longDescription: undefined,
  shortDescription: undefined,
  aliases: [
    getAliasRecord(),
    getAliasRecord({ alias: 'truc', contextDomain: 'machin' }),
  ],
  unit: undefined,
  algorithm: getADEItemAlgorithm(),
  tmMeta: getADEItemMetadataTM(),
}, override);

const getADEItemMetadataProtobuf = override => {
  const toEncode = getADEItemMetadata(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEItemMetadata,
  getADEItemMetadataProtobuf,
};
