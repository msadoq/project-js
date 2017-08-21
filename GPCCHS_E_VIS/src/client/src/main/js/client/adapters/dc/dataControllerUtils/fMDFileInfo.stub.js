const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./fMDFileInfo');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/FMDFileInfo.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.FMDFileInfo');

const FMDFILETYPE_DOCUMENT = 2;

const getFMDFileInfo = override => applyOverride({
  type: FMDFILETYPE_DOCUMENT,
  serializedOid: '0001000101000100010000000000000001',
}, override);

const getFMDFileInfoProtobuf = override => Builder.encode(Adapter.encode(getFMDFileInfo(override))).finish();

module.exports = {
  getFMDFileInfo,
  getFMDFileInfoProtobuf,
};
