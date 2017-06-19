const protobuf = require('../../../index');
const applyOverride = require('../../applyOverride');

const FMDFILETYPE_COLLECTION = 0;

const getFMDFileType = override => applyOverride({
  type: FMDFILETYPE_COLLECTION,
}, override);

const getFMDFileTypeProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.FMDFileType',
  getFMDFileType(override)
);

module.exports = {
  getFMDFileType,
  getFMDFileTypeProtobuf,
};
