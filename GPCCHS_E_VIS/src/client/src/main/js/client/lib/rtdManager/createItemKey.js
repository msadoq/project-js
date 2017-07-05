export default function createItemKey(sessionId, domainId, catalog, namespace, name) {
  return `${sessionId}:${domainId}:${catalog}:${namespace}:${name}`;
}
