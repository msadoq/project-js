// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const Adapter = require('./boolean');
const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Boolean.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Boolean');

const getBoolean = (boolean = false) => ({
  boolean,
});

const getBooleanProtobuf = boolean => Builder.encode(Adapter.encode(getBoolean(boolean))).finish();
const getBooleanDeProtobuf = buffer => Adapter.decode(Builder.decode(buffer));

module.exports = {
  getBoolean,
  getBooleanProtobuf,
  getBooleanDeProtobuf
};
