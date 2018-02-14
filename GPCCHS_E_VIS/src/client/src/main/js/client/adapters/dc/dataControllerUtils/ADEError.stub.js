const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEError');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/ADEError.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.ADEError');

const getADEError = override => applyOverride({
  code: 0,
  message: 'Default error message'
}, override);

const getADEErrorProtobuf = override => Builder.encode(Adapter.encode(getADEError(override))).finish();

module.exports = {
  getADEError,
  getADEErrorProtobuf,
};
