// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./sendLog');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/SendLog.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.SendLog');

const getSendLog = override => applyOverride({
  uid: 42,
  arguments: ['logArg1', 'logArg2'],
}, override);

const getSendLogProtobuf = override => Builder.encode(Adapter.encode(getSendLog(override))).finish();

module.exports = {
  getSendLog,
  getSendLogProtobuf,
};
