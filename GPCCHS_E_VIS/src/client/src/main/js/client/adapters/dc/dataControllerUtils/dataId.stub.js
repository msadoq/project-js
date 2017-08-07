const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./dataId');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/DataId.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.DataId');

const getDataId = override => applyOverride({
  parameterName: 'ATT_BC_STR1STRRFQ1',
  catalog: 'Reporting',
  comObject: 'ReportingParameter',
  sessionId: 100,
  domainId: 200,
}, override);

const getDataIdProtobuf = override => Builder.encode(Adapter.encode(getDataId(override))).finish();

module.exports = {
  getDataId,
  getDataIdProtobuf,
};
