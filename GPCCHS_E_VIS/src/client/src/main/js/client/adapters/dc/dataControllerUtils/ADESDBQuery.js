module.exports = {
  encode: ({ method, sessionId, domainId, catalogName, catalogItemName, comObject, fieldName }) => ({
    method,
    sessionId,
    domainId,
    catalogName,
    catalogItemName,
    comObject,
    fieldName,
  }),
  decode: ({ method, sessionId, domainId, catalogName, catalogItemName, comObject, fieldName }) => ({
    method,
    sessionId,
    domainId,
    catalogName,
    catalogItemName,
    comObject,
    fieldName,
  }),
};