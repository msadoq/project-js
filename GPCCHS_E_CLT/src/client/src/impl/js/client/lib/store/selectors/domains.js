import _ from 'lodash';
/**
 * Selectors
 */
// TODO test
// TODO rename as getDomainByName (or remove)
// TODO implement a simple getDomain (by uuid)
export default function getDomain(state, key) {
  return _.find(_.get(state, 'domains'), o => _.eq(o.name, key));
}
