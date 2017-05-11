import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { get } from 'common/parameters';

let memoizedDomains;
let memoizedSearchs = {};

export function reset(domains) {
  memoizedDomains = domains;
  memoizedSearchs = {};
}

export function save(search, result) {
  if (search !== get('WILDCARD_CHARACTER')) {
    _set(memoizedSearchs, [search], result);
  }
}

export function find(search, domains, viewDomain, pageDomain, workspaceDomain) {
  if (!domains || !domains.length) {
    return { error: 'invalid entry point, no domain available' };
  }
  if (search === '' || _isNull(search) || _isUndefined(search)) {
    return { error: 'invalid entry point, invalid domain field' };
  }
  let domainName = search;
  if (search === get('WILDCARD_CHARACTER')) {
    // Look to domainNames defined on
    if (viewDomain) { // 1. view
      domainName = viewDomain;
    } else if (pageDomain) {  // 2. page
      domainName = pageDomain;
    } else if (workspaceDomain) { // 3. workspace
      domainName = workspaceDomain;
    } else {
      return { error: 'invalid entry point, domain not defined on entities' };
    }
  }

  const domainIds = _map(_filter(domains, d => d.name === domainName), d => d.domainId);
  if (domainIds.length < 1) {
    return { error: 'invalid entry point, no domain matches' };
  } else if (domainIds.length > 1) {
    return { error: 'invalid entry point, more than one domains match' };
  }

  return { domainId: domainIds[0], domainName };
}

/**
 * Apply search on domains and return corresponding domainId.
 *
 * Search is memoized until domains list is common to the whole app.
 *
 * @param domains
 * @param search
 * @param viewDomain
 * @param pageDomain
 * @param workspaceDomain
 * @returns {*}
 */
export default function findDomain(
  domains,
  search,
  viewDomain,
  pageDomain,
  workspaceDomain) {
  // domains have changed
  if (memoizedDomains !== domains) {
    reset(domains);
  }

  // perform new search
  if (!_has(memoizedSearchs, [search])) {
    const domain =
      find(search, memoizedDomains, viewDomain, pageDomain, workspaceDomain);
    save(search, domain);
    return domain;
  }

  return _get(memoizedSearchs, [search]);
}
