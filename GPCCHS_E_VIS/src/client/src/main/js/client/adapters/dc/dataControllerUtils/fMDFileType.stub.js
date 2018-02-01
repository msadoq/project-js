// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./fMDFileType');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/FMDFileType.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.FMDFileType');

const FMDFILETYPE_COLLECTION = 0;

const getFMDFileType = override => applyOverride({
  type: FMDFILETYPE_COLLECTION,
}, override);

const getFMDFileTypeProtobuf = override => Builder.encode(Adapter.encode(getFMDFileType(override))).finish();
module.exports = {
  getFMDFileType,
  getFMDFileTypeProtobuf,
};
