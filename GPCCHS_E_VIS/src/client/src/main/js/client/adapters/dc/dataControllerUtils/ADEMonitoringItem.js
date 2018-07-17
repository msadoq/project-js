const monitoringLaw = require('./ADEMonitoringLaw');

const encode = data => ({
  itemName: data.itemName,
  law: data.law ? monitoringLaw.encode(data.law) : undefined,
});

const decode = data => ({
  itemName: data.itemName,
  law: data.law ? monitoringLaw.decode(data.law) : undefined,
});

module.exports = {
  encode,
  decode,
};
