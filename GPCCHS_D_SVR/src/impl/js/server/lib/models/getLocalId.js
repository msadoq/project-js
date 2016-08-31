/**
 * Generate a predictable local unique id for a given dataId Object
 * @param dataId {catalog, parameterName, comObject, sessionId, domainId }
 */
module.exports = dataId => {
  const {
    catalog,
    parameterName,
    comObject,
    sessionId,
    domainId,
  } = dataId;
  return `${catalog}.${parameterName}<${comObject}>:${sessionId}:${domainId}`;
};
