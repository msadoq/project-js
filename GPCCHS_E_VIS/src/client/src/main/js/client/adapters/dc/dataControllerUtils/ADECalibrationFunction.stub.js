const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADECalibrationFunction');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADECalibrationFunction.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADECalibrationFunction');

const getADECalibrationFunction = override => applyOverride({
  functionName: 'makeItGreatAgain',
  selectionCondition: 'tion-tion-du-bois',
}, override);

const getADECalibrationFunctionProtobuf = override => {
  const toEncode = getADECalibrationFunction(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADECalibrationFunction,
  getADECalibrationFunctionProtobuf,
};
