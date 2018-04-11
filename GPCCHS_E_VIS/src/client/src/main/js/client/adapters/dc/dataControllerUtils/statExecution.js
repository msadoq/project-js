const _map = require('lodash/map');

module.exports = {
  encode: data => ({
    statExecution: data.statExecution,
  }),
  decode: data => {
    const statExecution = data[0];
    const statValueData = data[1];
    const statAggregData = data[2];
    const obj = {
      launchingTime: statExecution.launchingTime,
      related: statValueData.related,
      attrValue: statValueData.attrValue,
      statDate: statAggregData.statDate,
      statValue: statAggregData.statValue,
      referenceTimestamp: statAggregData.statDate,
    }; 
    statExecution.launchingParameter.forEach(element => {
      obj[element.name.value] = element.value;
    });

    return obj;
  },
};