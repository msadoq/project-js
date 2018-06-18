// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for
//  each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/domains . . .
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Add JSDoc on codeEditor, domains & health reducers
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _clone from 'lodash/clone';
import * as types from 'store/types';
import { createSelector } from 'reselect';
import _find from 'lodash/find';
import { get } from '../../../common/configurationManager';
import { getView } from '../views';
import { getPageDomainName } from '../pages';
import { getDomainName } from '../hsc';

/* --- Reducer -------------------------------------------------------------- */

/**
 * Update domains property in Redux store.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched.
 * @return {object} The new state.
 */
export default function domains(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_DOMAINS:
      return _clone(action.payload.domains);
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

/**
 * Get the domains.
 * @param {object} state - The current state.
 * @return {array} array of domains.
 */
export const getDomains = state => state.domains;
export const getDomainByName = createSelector(
  (state, { domainName }) => domainName,
  getDomains,
  (domainName, _domains) => _find(_domains, d => d.name === domainName)
  )
;

/**
 * @param domainName
 * @param viewId
 * @param pageId
 * @return
 *  found domain if exists
 *  or undefined if not
 *  or error if cannot proceed to fallback
 */
export const getDomainByNameWithFallback = createSelector(
  (state, { domainName }) => domainName,
  getDomains,
  getView,
  (state, { pageId }) => getPageDomainName(state, { pageId }),
  getDomainName,
  (domainName, _domains, view, pageDomainName, workspaceDomainName) => {
    let resolvedDomainName = domainName;
    const wildcardCharacter = get('WILDCARD_CHARACTER');
    if (domainName === wildcardCharacter) {
      if (view && view.domainName && view.domainName !== wildcardCharacter) { // 1. view
        resolvedDomainName = view.domainName;
      } else if (pageDomainName && pageDomainName !== wildcardCharacter) {  // 2. page
        resolvedDomainName = pageDomainName;
      } else if (workspaceDomainName && workspaceDomainName !== wildcardCharacter) { // 3. workspace
        resolvedDomainName = workspaceDomainName;
      } else {
        return { error: 'invalid entry point, domain not defined on entities' };
      }
    }
    return _find(_domains, d => d.name === resolvedDomainName);
  }
);

export const getDomainId = createSelector(
  getDomainByNameWithFallback,
  domain => (domain ? domain.domainId : null)
);
