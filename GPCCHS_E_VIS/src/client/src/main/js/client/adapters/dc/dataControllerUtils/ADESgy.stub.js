const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADESgy');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADESgy.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADESgy');

const getADESgy = override => applyOverride({
  validityCondition: 'python',
  inputParameters: ['nif-nif', 'nouf-nouf', 'naf-naf'],
}, override);

const getADESgyProtobuf = override => {
  const toEncode = getADESgy(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADESgy,
  getADESgyProtobuf,
};
