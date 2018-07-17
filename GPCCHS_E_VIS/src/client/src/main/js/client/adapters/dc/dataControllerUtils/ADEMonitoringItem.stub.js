const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEMonitoringItem');

const { getADEMonitoringLaw } = require('./ADEMonitoringLaw.stub');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEMonitoringItem.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEMonitoringItem');

const getADEMonitoringItem = override => applyOverride({
  item: 'inator',
  law: getADEMonitoringLaw(),
}, override);

const getADEMonitoringItemProtobuf = override => {
  const toEncode = getADEMonitoringItem(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEMonitoringItem,
  getADEMonitoringItemProtobuf,
};
