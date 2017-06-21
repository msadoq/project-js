const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./fMDGet');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/FMDGet.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.FMDGet');

const getFMDGet = override => applyOverride({
  serializedOid: '0001000101000100010000000000000001',
}, override);

const getFMDGetProtobuf = override => Builder.encode(Adapter.encode(getFMDGet(override)));

module.exports = {
  getFMDGet,
  getFMDGetProtobuf,
};
