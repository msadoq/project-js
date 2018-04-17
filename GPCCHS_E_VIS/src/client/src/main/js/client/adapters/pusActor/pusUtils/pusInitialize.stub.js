const ProtoBuf = require('protobufjs');
const Adapter = require('./pusInitialize');
const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/PusInitialize.proto`, { keepCase: true }).lookup('pusUtils.protobuf.PusInitialize');

const getPusInitialize = () => ({
  pusId: 'myPusId',
  apId: 'myApId'
});

const getPusInitializeProtobuf = () => Builder.encode(Adapter.encode(getPusInitialize())).finish();

module.exports = {
  getPusInitialize,
  getPusInitializeProtobuf,
};