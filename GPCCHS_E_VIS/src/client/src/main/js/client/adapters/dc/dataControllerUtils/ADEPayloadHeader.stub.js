const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEPayloadHeader');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEPayloadHeader.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEPayloadHeader');

const getADEPayloadHeader = (providerId, comObjectType) => {
  providerId,
  comObjectType
};

module.exports = {
  getADEPayloadHeader,
};
