const _map = require('lodash/map');

const Filter = require('./filter');
const TimeInterval = require('./timeInterval');

module.exports = {
  encode: data => ({
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    providerFlow: data.providerFlow,
    timeInterval: data.timeInterval ? TimeInterval.encode(data.timeInterval) : undefined,
    sortFieldName: data.sortFieldName,
    sortOrder: data.sortOrder,
    getLastNumber: data.getLastNumber,
    filters: data.filters.map((value) => Filter.encode(value)),
  }),
  decode: data => ({
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    providerFlow: data.providerFlow,
    timeInterval: (data.timeInterval !== null ) ? TimeInterval.decode(data.timeInterval) : undefined,
    sortFieldName: data.sortFieldName,
    sortOrder: data.sortOrder,
    getLastNumber: data.getLastNumber,
    filters: data.filters.map((value) => Filter.decode(value)),
  }),
};