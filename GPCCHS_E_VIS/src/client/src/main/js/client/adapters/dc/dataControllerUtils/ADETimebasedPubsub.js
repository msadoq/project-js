const Filter = require('./filter');

module.exports = {
  encode: data => ({
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    filters:  _map(data.filters, p => Filter.encode(p)),
  }),
  decode: data => ({
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    filters:  _map(data.filters, p => Filter.decode(p)),
  }),
};