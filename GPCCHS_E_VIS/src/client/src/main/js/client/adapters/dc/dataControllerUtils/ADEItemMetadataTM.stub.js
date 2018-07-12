const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./ADEItemMetadataTM');

const { getADESgy } = require('./ADESgy.stub');
const { getADEMonitoringItem } = require('./ADEMonitoringItem.stub');
const { getADECalibrationFunction } = require('./ADECalibrationFunction.stub');

const Builder = new ProtoBuf.Root()
  .loadSync(`${__dirname}/ADEItemMetadataTM.proto`, { keepCase: true })
  .lookup('dataControllerUtils.protobuf.ADEItemMetadataTM');

const getADEItemMetadataTM = override => applyOverride({
  sgy: [getADESgy()],
  monitoringItems: [],
  computedTriggers: ['plic', 'plac', 'plouc'],
  computingDefinitions: ['bif', 'baf', 'bof'],
  calibrationFunctions: [getADECalibrationFunction()],
}, override);

const getADEItemMetadataTMProtobuf = override => {
  const toEncode = getADEItemMetadataTM(override);
  return Builder.encode(Adapter.encode(toEncode)).finish();
};

module.exports = {
  getADEItemMetadataTM,
  getADEItemMetadataTMProtobuf,
};
