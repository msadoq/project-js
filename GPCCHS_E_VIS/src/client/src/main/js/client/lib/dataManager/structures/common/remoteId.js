import _ from 'lodash';

function flattenFilters(filters = []) {
  if (!filters.length) {
    return undefined;
  }

  return _.sortBy(_.map(filters,
    ({ field, operator, operand }) => `${field}.${operator}.${operand}`
  ), e => e);
}

/**
 * Generate a predictable remoteId for a given dataId and filters
 * @param dataId {catalog, parameterName, comObject, sessionId, domainId}
 * @param filters []
 * @return string
 */
module.exports = (structureType, dataId, filters) => {
  const {
    catalog,
    parameterName,
    comObject,
    sessionId,
    domainId,
  } = dataId;

  let id = `${structureType}@${catalog}.${parameterName}<${comObject}>:${sessionId}:${domainId}`;

  const filtersString = flattenFilters(filters);
  if (filtersString) {
    id += `:${filtersString.join(',')}`;
  }

  return id;
};
