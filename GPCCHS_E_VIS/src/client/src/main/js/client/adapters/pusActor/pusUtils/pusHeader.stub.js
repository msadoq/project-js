const ProtoBuf = require('protobufjs');
const Adapter = require('./pusHeader');
const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/PusHeader.proto`, { keepCase: true }).lookup('pusUtils.protobuf.PusHeader');

const SUBSCRIPTIONACTION_ADD = 0;
const SUBSCRIPTIONACTION_DELETE = 1;

const getPusHeader = (method) => ({
  method,
});

const getPusHeaderProtobuf = (method) => Builder.encode(Adapter.encode(getPusHeader(method))).finish();

module.exports = {
  getPusHeader,
  getPusHeaderProtobuf,
};