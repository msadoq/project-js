/**
 * Generate a predictable flat dataId for a given dataId Object
 * @param dataId {catalog, parameterName, comObject, sessionId, domainId }
 */
module.exports = (dataId, filters = []) => {
  const {
    catalog,
    parameterName,
    comObject,
    sessionId,
    domainId,
  } = dataId;
  return `${catalog}.${parameterName}<${comObject}>:${sessionId}:${domainId}${flattenFilters(filters)}`;
};

function flattenFilters(filters = []) {
  if (!filters.length) {
    return '';
  }
  const filterStr = filters.map(({ field, operator, operand }) => `${field}.${operator}.${operand}`);
  return ':'.concat(filterStr.join());
}
