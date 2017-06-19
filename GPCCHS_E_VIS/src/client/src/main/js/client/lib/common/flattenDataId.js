/**
 * Generate a predictable flat dataId for a given dataId Object
 * @param dataId {catalog, parameterName, comObject, sessionId, domainId }
 */
module.exports = (dataId) => {
  const {
    catalog,
    parameterName,
    comObject,
    sessionId,
    domainId,
  } = dataId;
  return `${catalog}.${parameterName}<${comObject}>:${sessionId}:${domainId}`;
};
