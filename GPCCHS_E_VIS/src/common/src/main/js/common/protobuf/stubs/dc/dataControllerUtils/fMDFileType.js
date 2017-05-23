const protobuf = require('../../../index');
const globalConstants = require('../../../../constants/index');
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
