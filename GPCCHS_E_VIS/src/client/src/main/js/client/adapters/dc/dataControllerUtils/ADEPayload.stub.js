const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEPayload');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEPayload.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEPayload');

const { getADEGenericPayload } = require('./ADEGenericPayload.stub');

const getADEPayload = ({payload, providerId, comObjectType}) => {
  genericPayload: [
    getADEGenericPayload(payload, providerId, comObjectType),
  ]
};

const getADEPayloadProtobuf = override => Builder.encode(Adapter.encode(getADEPayload(override))).finish();

module.exports = {
  getADEPayload,
  getADEPayloadProtobuf,
};
