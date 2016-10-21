import _reduce from 'lodash/reduce';
import _find from 'lodash/find';
import { detect, generate } from './wildcard';

// TODO: memoize with reselect (domains, search)

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
    const domain = _find(domains, v => v.name === search);
    if (!domain) {
      return [];
    }
    return [domain.domainId];
  }

  const reg = generate(search);
  return _reduce(domains, (list, domain) => (domain.name && reg.test(domain.name)
    ? list.concat(domain.domainId)
    : list), []);
}
