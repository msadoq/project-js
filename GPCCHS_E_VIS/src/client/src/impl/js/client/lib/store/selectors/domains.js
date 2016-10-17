import _find from 'lodash/find';
import _eq from 'lodash/eq';

/**
 * Selectors
 */
// TODO test
// TODO rename as getDomainByName (or remove)
// TODO implement a simple getDomain (by uuid)
export default function getDomain(state, key) {
  return _find(state.domains, o => _eq(o.name, key));
}
