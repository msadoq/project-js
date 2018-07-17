const adeSgy = require('./ADESgy');
const monitoringItem = require('./ADEMonitoringItem');
const calibrationFunction = require('./ADECalibrationFunction');


module.exports.encode = data => ({
  sgy: data.sgy.map(sgy => adeSgy.encode(sgy)),
  monitoringItems: data.monitoringItems.map(item => monitoringItem.encode(item)),
  computedTriggers: data.computedTriggers,
  computingDefinitions: data.computingDefinitions,
  calibrationFunctions: data.calibrationFunctions.map(func => calibrationFunction.encode(func)),
});

module.exports.decode = data => ({
  sgy: data.sgy.map(sgy => adeSgy.decode(sgy)),
  monitoringItems: data.monitoringItems.map(item => monitoringItem.decode(item)),
  computedTriggers: data.computedTriggers,
  computingDefinitions: data.computingDefinitions,
  calibrationFunctions: data.calibrationFunctions.map(func => calibrationFunction.decode(func)),
});
