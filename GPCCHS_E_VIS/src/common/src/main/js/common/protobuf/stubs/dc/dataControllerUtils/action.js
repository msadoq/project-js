const ProtoBuf = require('protobufjs');
const Adapter = require('./action');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Action.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Action');

const SUBSCRIPTIONACTION_ADD = 0;
const SUBSCRIPTIONACTION_DELETE = 1;

const getAddAction = () => ({
  action: SUBSCRIPTIONACTION_ADD,
});
const getDeleteAction = () => ({
  action: SUBSCRIPTIONACTION_DELETE,
});

const getAddActionProtobuf = () => Builder.encode(Adapter.encode(getAddAction()));
const getDeleteActionProtobuf = () => Builder.encode(Adapter.encode(getDeleteAction()));

module.exports = {
  getAddAction,
  getDeleteAction,
  getAddActionProtobuf,
  getDeleteActionProtobuf,
};
