const _map = require('lodash/map');

const fMDDocumentProperty = require('./fMDDocumentProperty');

module.exports = {
  encode: data => ({
    name: data.name,
    path: data.path,
    mimeType: data.mimeType,
    domainId: data.domainId,
    properties: _map(data.properties, p => fMDDocumentProperty.encode(p)),
  }),
  decode: data => ({
    name: data.name,
    path: data.path,
    mimeType: data.mimeType,
    domainId: data.domainId,
    properties: _map(data.properties, p => fMDDocumentProperty.decode(p)),
  }),
};
