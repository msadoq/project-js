// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// END-HISTORY
// ====================================================================

export default function createItemKey(sessionId, domainId, catalog, namespace, name) {
  return `${sessionId}:${domainId}:${catalog}:${namespace}:${name}`;
}
