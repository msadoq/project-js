const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./sessionGetTime');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/SessionGetTime.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.SessionGetTime');


const getSessionGetTime = override => applyOverride({
  id: 42,
}, override);

const getSessionGetTimeProtobuf = override => Builder.encode(Adapter.encode(getSessionGetTime(override)));

module.exports = {
  getSessionGetTime,
  getSessionGetTimeProtobuf,
};
