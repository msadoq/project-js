const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEAlgorithmLanguage');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEAlgorithmLanguage.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEAlgorithmLanguage');

const getADEAlgorithmLanguage = override => applyOverride({
  validityCondition: 'python',
  inputParameters: ['nif-nif', 'nouf-nouf', 'naf-naf'],
}, override);

const getADEAlgorithmLanguageProtobuf = override => {
  const toEncode = getADEAlgorithmLanguage(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEAlgorithmLanguage,
  getADEAlgorithmLanguageProtobuf,
};
