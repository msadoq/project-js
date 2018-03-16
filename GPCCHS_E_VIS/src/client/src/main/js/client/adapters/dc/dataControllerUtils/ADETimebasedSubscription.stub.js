const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADETimebasedSubscription');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADETimebasedSubscription.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADETimebasedSubscription');

const getADETimebasedSubscription = override => applyOverride({
  action: 0,
  sessionId: 4,
  domainId: 42,
  objectName: 'myObject',
  catalogName: 'myCatalog',
  itemName: 'myItem',
  providerFlow: 'myProvider',
}, override);

const getADETimebasedSubscriptionProtobuf = override => {
  const toEncode = getADETimebasedSubscription(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADETimebasedSubscription,
  getADETimebasedSubscriptionProtobuf,
};
