const ProtoBuf = require('protobufjs');
const Adapter = require('./boolean');
const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Boolean.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Boolean');

const getBoolean = (boolean = false) => ({
  boolean,
});

const getBooleanProtobuf = boolean => Builder.encode(Adapter.encode(getBoolean(boolean))).finish();

module.exports = {
  getBoolean,
  getBooleanProtobuf,
};
