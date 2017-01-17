const _sortBy = require('lodash/sortBy');
const _map = require('lodash/map');

const dcStubs = require('./data/dc');
const lpisisStubs = require('./data/lpisis');

const stubs = module.exports = Object.assign({}, dcStubs, lpisisStubs);

// RemoteId
stubs.getRemoteId = (override) => {
  const r = stubs.getDataId(override);
  const filters = (typeof override !== 'undefined' && typeof override.filters !== 'undefined')
    ? override.filters
    : [stubs.getFilter()];
  const flattenFilters = _sortBy(_map(filters,
    ({ fieldName, type, fieldValue }) => `${fieldName}.${type}.${fieldValue}`
  ), e => e);
  let remoteId = `${r.catalog}.${r.parameterName}<${r.comObject}>:${r.sessionId}:${r.domainId}`;
  if (flattenFilters) {
    remoteId += `:${flattenFilters.join(',')}`;
  }
  return remoteId;
};
