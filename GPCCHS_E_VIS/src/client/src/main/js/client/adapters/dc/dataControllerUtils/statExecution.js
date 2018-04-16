const _map = require('lodash/map');

module.exports = {
  encode: data => ({
    statExecution: data.statExecution,
  }),
  decode: data => {
    const statExecution = data['Execution'];
    const statValueData = data['StatValue'];
    const statAggregData = data['StatAggregation'];
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