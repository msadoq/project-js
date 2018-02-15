const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEGenericPayload');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEGenericPayload.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEGenericPayload');

const { getADEPayloadHeader } = require('./ADEPayloadHeader.stub');

const getADEGenericPayload = (payload, providerId, comObjectType, instanceOid) => {
  return {
    header: getADEPayloadHeader(providerId, comObjectType, instanceOid),
    payload
  }
  
};

module.exports = {
  getADEGenericPayload,
};
