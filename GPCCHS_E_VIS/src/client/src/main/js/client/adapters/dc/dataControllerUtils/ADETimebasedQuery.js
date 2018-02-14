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
    timeInterval: TimeInterval.encode(data.timeInterval),
    sortFieldName: data.sortFieldName,
    sortOrder: data.sortOrder,
    getLastNumber: data.getLastNumber,
    filters: _map(data.filters, p => Filter.encode(p)),
  }),
  decode: data => ({
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    providerFlow: data.providerFlow,
    timeInterval: TimeInterval.decode(data.timeInterval),
    sortFieldName: data.sortFieldName,
    sortOrder: data.sortOrder,
    getLastNumber: data.getLastNumber,
    filters: _map(data.filters, p => Filter.decode(p)),
  }),
};