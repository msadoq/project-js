import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import globalConstants from 'common/constants';

let memoizedDomains;
let memoizedSearchs = {};

export function reset(domains) {
  memoizedDomains = domains;
  memoizedSearchs = {};
}

export function save(search, result) {
  _set(memoizedSearchs, [search], result);
}

export function find(search, domains) {
  if (search === globalConstants.WILDCARD_CHARACTER) {
    return { error: 'invalid entry point, domain wildcard not already supported' };
  }
  if (!domains || !domains.length) {
    return { error: 'invalid entry point, no domain available' };
  }
  if (search === '' || _isNull(search) || _isUndefined(search)) {
    return { error: 'invalid entry point, invalid domain field' };
  }

  const domainIds = _map(_filter(domains, d => d.name === search), d => d.domainId);
  if (domainIds.length < 1) {
    return { error: 'invalid entry point, no domain matches' };
  } else if (domainIds.length > 1) {
    return { error: 'invalid entry point, more than one domains match' };
  }

  return { domainId: domainIds[0] };
}

/**
 * Apply search on domains and return corresponding domainId.
 *
 * Search is memoized until domains list is common to the whole app.
 *
 * @param domains
 * @param search
 * @returns {*}
 */
export default function findDomain(domains, search) {
  // domains have changed
  if (memoizedDomains !== domains) {
    reset(domains);
  }

  // perform new search
  if (!_has(memoizedSearchs, [search])) {
    save(search, find(search, memoizedDomains));
  }

  return _get(memoizedSearchs, [search]);
}
