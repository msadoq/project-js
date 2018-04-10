// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Update unit tests and stubs for provider
//  field and fix parseEntryPoint calls in all views
// END-HISTORY
// ====================================================================

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
  provider: 'myProvider'
}, override);

const getDataIdProtobuf = override => Builder.encode(Adapter.encode(getDataId(override))).finish();

module.exports = {
  getDataId,
  getDataIdProtobuf,
};
