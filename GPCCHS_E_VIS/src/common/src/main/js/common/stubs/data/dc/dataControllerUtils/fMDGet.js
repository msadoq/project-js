const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const getFMDGet = override => applyOverride({
  serializedOid: '0001000101000100010000000000000001',
}, override);

const getFMDGetProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.FMDGet',
  getFMDGet(override)
);

module.exports = {
  getFMDGet,
  getFMDGetProtobuf,
};
