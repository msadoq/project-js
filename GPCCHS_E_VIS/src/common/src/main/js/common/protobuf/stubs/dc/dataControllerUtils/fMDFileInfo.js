const protobuf = require('../../../index');
const applyOverride = require('../../applyOverride');

const FMDFILETYPE_DOCUMENT = 2;

const getFMDFileInfo = override => applyOverride({
  type: FMDFILETYPE_DOCUMENT,
  serializedOid: '0001000101000100010000000000000001',
}, override);

const getFMDFileInfoProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.FMDFileInfo',
  getFMDFileInfo(override)
);

module.exports = {
  getFMDFileInfo,
  getFMDFileInfoProtobuf,
};
