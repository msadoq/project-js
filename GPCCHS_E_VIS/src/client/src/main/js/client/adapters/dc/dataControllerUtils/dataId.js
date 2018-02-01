// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

module.exports = {
  encode: data => ({
    parameterName: data.parameterName,
    oid: data.oid,
    sourceOid: data.sourceOid,
    catalog: data.catalog,
    comObject: data.comObject,
    sessionId: data.sessionId,
    domainId: data.domainId,
    url: data.url,
    version: data.version,
  }),
  decode: data => ({
    parameterName: data.parameterName,
    oid: data.oid,
    sourceOid: data.sourceOid,
    catalog: data.catalog,
    comObject: data.comObject,
    sessionId: data.sessionId,
    domainId: data.domainId,
    url: data.url,
    version: data.version,
  }),
};
