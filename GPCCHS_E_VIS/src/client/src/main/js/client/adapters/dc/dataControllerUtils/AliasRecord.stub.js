const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./AliasRecord');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/AliasRecord.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.AliasRecord');

const getAliasRecord = override => applyOverride({
  alias: 'matique',
  contextDomain: '\'t no sunshine',
}, override);

const getAliasRecordProtobuf = override => {
  const toEncode = getAliasRecord(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getAliasRecord,
  getAliasRecordProtobuf,
};
