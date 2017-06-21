const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./fMDFileType');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/FMDFileType.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.FMDFileType');

const FMDFILETYPE_COLLECTION = 0;

const getFMDFileType = override => applyOverride({
  type: FMDFILETYPE_COLLECTION,
}, override);

const getFMDFileTypeProtobuf = override => Builder.encode(Adapter.encode(getFMDFileType(override)));
module.exports = {
  getFMDFileType,
  getFMDFileTypeProtobuf,
};
