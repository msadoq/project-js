const protobuf = require('../../../../protobuf');
const globalConstants = require('../../../../constants');
const applyOverride = require('../../applyOverride');

const getFMDFileType = override => applyOverride({
  type: globalConstants.FMDFILETYPE_COLLECTION,
}, override);

const getFMDFileTypeProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.FMDFileType',
  getFMDFileType(override)
);

module.exports = {
  getFMDFileType,
  getFMDFileTypeProtobuf,
};
