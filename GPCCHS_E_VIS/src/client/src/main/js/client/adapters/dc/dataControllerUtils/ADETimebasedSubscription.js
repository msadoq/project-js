const Filter = require('./filter');

module.exports = {
  encode: data => ({
    action: data.action,
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    providerFlow: data.providerFlow,
    filters:  _map(data.filters, p => Filter.encode(p)),
  }),
  decode: data => ({
    action: data.action,
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    providerFlow: data.providerFlow,
    filters:  _map(data.filters, p => Filter.decode(p)),
  }),
};