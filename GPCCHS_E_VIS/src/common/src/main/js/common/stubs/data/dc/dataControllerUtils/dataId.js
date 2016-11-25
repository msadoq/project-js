const protobuf = require('../../../../protobuf');
const applyOverride = require('../../applyOverride');

const getDataId = override => applyOverride({
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
}, override);

const getDataIdProtobuf = override => protobuf.encode(
  'dc.dataControllerUtils.DataId',
  getDataId(override)
);

module.exports = {
  getDataId,
  getDataIdProtobuf,
};
