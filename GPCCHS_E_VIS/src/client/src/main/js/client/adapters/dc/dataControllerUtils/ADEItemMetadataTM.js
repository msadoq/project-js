const adeSgy = require('./ADESgy');
const monitoringItem = require('./ADEMonitoringItem');
const calibrationFunction = require('./ADECalibrationFunction');


const encode = data => ({
  sgy: data.sgy.map(sgy => adeSgy.encode(sgy)),
  monitoringItems: data.monitoringItem.map(item => monitoringItem.encode(item)),
  computedTriggers: data.computedTriggers,
  computingDefinitions: data.computeDefinitions,
  calibrationFunctions: data.calibrationFunctions.map(func => calibrationFuction.encode(func)),
});

const decode = data => ({
  sgy: data.sgy.map(sgy => adeSgy.decode(sgy)),
  monitoringItems: data.monitoringItem.map(item => monitoringItem.decode(item)),
  computedTriggers: data.computedTriggers,
  computingDefinitions: data.computeDefinitions,
  calibrationFunctions: data.calibrationFunctions.map(func => calibrationFuction.decode(func)),
});

module.exports = {
  encode,
  decode,
};
