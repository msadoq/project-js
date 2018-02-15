const _map = require('lodash/map');
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
  }),
  decode: data => ({
    action: data.action,
    sessionId : data.sessionId,
    domainId: data.domainId,
    objectName: data.objectName,
    catalogName: data.catalogName,
    itemName: data.itemName,
    providerFlow: data.providerFlow,
  }),
};