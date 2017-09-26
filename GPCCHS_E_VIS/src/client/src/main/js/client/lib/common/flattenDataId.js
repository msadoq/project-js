// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

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
