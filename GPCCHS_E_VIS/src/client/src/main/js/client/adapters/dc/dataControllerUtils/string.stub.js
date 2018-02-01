// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
