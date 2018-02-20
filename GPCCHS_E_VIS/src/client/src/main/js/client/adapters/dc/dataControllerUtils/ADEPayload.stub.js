const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEPayload');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEPayload.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEPayload');

const { getADEGenericPayload } = require('./ADEGenericPayload.stub');

const getADEPayload = ({ payload, providerId, comObjectType, instanceOid }) => {  
  return {
    genericPayload: [
      getADEGenericPayload(payload, providerId, comObjectType, instanceOid),
    ]
  };
};

const getADEPayloadProtobuf = override => {
  const toEncode = getADEPayload(override);
  // console.log(toEncode);
  return Builder.encode(Adapter.encode(toEncode)).finish();
}

module.exports = {
  getADEPayload,
  getADEPayloadProtobuf,
};
