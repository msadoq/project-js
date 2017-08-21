const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./string');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/String.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.String');


const getString = (string = 'defaultString') => ({
  string,
});
const getStringProtobuf = string => Builder.encode(Adapter.encode(getString(string))).finish();

module.exports = {
  getString,
  getStringProtobuf,
};
