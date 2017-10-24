/**
 * Generate a predictable flat dataId for a given dataId Object
 * @param dataId {catalog, parameterName, comObject, sessionId, domainId }
 */
module.exports = (dataId, filters = [], mode) => {
  const {
    catalog,
    parameterName,
    comObject,
    sessionId,
    domainId,
  } = dataId;
  const _mode = mode ? `:${mode}` : '';
  return `${catalog}.${parameterName}<${comObject}>:${sessionId}:${domainId}${flattenFilters(filters)}${_mode}`;
};

function flattenFilters(filters = []) {
  if (!filters.length) {
    return '';
  }
  const filterStr = filters.map(({ field, operator, operand }) => `${field}.${operator}.${operand}`);
  return ':'.concat(filterStr.join());
}
