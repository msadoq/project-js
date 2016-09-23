import _ from 'lodash';
import { detect, generate } from './wildcard';

// TODO memoize (domains list is immutable in lifecycle)

/**
 * Filter domains on name and return and an array of ids.
 *
 * @param domains
 * @param search
 * @returns [int]
 */
export default function filter(domains, search) {
  if (!domains || !domains.length || !search) {
    return [];
  }

  if (!detect(search)) {
    const domain = _.find(domains, v => v.name === search);
    if (!domain) {
      return [];
    }
    return [domain.oid];
  }

  const reg = generate(search);
  return _.reduce(domains, (list, domain) => {
    return domain.name && reg.test(domain.name)
      ? list.concat(domain.oid)
      : list;
  }, []);
}
