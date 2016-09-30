const dataFilter = require('./dataFilter');
const _ = require('lodash');

module.exports = {
  encode: data => ({
    parameterName: data.parameterName,
    oid: data.oid,
    catalog: data.catalog,
    comObject: data.comObject,
    sessionId: data.sessionId,
    domainId: data.domainId,
    url: data.url,
    version: data.version,
    filters: _.map(data.filters, filter => dataFilter.encode(filter)),
  }),
  decode: data => ({
    parameterName: data.parameterName,
    oid: data.oid,
    catalog: data.catalog,
    comObject: data.comObject,
    sessionId: data.sessionId,
    domainId: data.domainId,
    url: data.url,
    version: data.version,
    filters: _.map(data.filters, filter => dataFilter.decode(filter)),
  }),
};
