const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEMonitoringLaw');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEMonitoringLaw.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEMonitoringLaw');

const getADEMonitoringLaw = override => applyOverride({
  type: 'ster',
  // expectedValue: '42',
  // maskType: 'bat',
  // applicationCondition: 'sqdsqd',
}, override);

const getADEMonitoringLawProtobuf = override => {
  const toEncode = getADEMonitoringLaw(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEMonitoringLaw,
  getADEMonitoringLawProtobuf,
};
