// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : StateColors serialized in localid and present in
//  viewData
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2241 : 31/01/2018 : Refacto state colors // cleanup
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// VERSION : 2.0.0.3 : FA : ISIS-FT-3301 : 25/05/2018 : prise en compte conf monitoringState VIMA
// VERSION : 2.0.0.3 : FA : ISIS-FT-3301 : 30/05/2018 : prise en compte conf monitoringState VIMA
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : bug on getColorwithDomainDetermination . .
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA . .
// VERSION : 2.0.0.3 : FA : #13142 : 13/06/2018 : hot fix bug on non existing domain color in
//  configuration
// END-HISTORY
// ====================================================================

import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _first from 'lodash/first';
import _find from 'lodash/find';
import _memoize from 'lodash/memoize';
import { get } from 'common/configurationManager';
import _pull from 'lodash/pull';
import _uniq from 'lodash/uniq';
import _flatMap from 'lodash/flatMap';
import _ from 'lodash';
import { domainDeterminationForColor } from './domains';

export const STATE_COLOR_NOMINAL = 'nominal';
export const STATE_COLOR_WARNING = 'warning';
export const STATE_COLOR_ALARM = 'danger';
export const STATE_COLOR_SEVERE = 'severe';
export const STATE_COLOR_CRITICAL = 'critical';
export const STATE_COLOR_OUT_OF_RANGE = 'outOfRange';

const wildcardCharacter = get('WILDCARD_CHARACTER');
const Domainscolors = get('DOMAINS_COLORS');

const colors = [
  '#FFFFFF', '#000000', '#f44336', '#e91e63', '#9c27b0',
  '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
  '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b',
  '#ffc107', '#ff9800', '#795548', '#607d8b',
];

export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

/**
 * @returns {*}
 */
export const getStateColors = () => get('STATE_COLORS');

/**
 * @param obsolete
 * @param significant
 * @returns {Array}
 */
export const getStateColorFilters = _memoize(
  (obsolete = false, significant = true) => _map(get('STATE_COLORS'), (monitoringStates, monitoringState) => {
    const o = _first(
      _filter(monitoringStates, s => s.obsolete === obsolete && s.significant === significant)
    );
    return {
      color: o.color,
      customize: isCustomizable(monitoringState, obsolete, significant),
      condition: {
        field: 'monitoringState',
        operator: '=',
        operand: monitoringState,
      },
    };
  }),
  (obsolete, significant) => `${obsolete}-${significant}`
);

/**
 * @param obsolete
 * @param significant
 * @param state
 * @returns {Array}
 */
export const getStateColor = _memoize(
  (obsolete = false, significant = true, state = STATE_COLOR_NOMINAL) =>
    _find(getStateColorFilters(obsolete, significant), o => (
        o.condition.operand === state
      )
    ),
  (obsolete, significant, state) =>
    `${obsolete}-${significant}-${state}`
);

/**
 * @type {Function}
 * @returns {array}
 */
export const getStateColorTypes = _memoize(
  () => Object.keys(getStateColors())
);

/**
 * @param monitoringState
 * @param obsolete
 * @param significant
 * @returns {boolean}
 */
export const isCustomizable = (monitoringState, obsolete, significant) =>
  (monitoringState === STATE_COLOR_NOMINAL && obsolete === false && significant === true)
;

/**
 * @deprecated
 * @returns {{}}
 */
const getStateColorsCSSVars =
  () => Object.keys(getStateColors())
    .map(k => ({
      [`--monit-${k}`]: getStateColors()[k],
    }))
    .reduce((acc, c) => ({
      ...acc,
      ...c,
    }), {});

export const getBackgroundColorByDomains = (workspaceDomain, pageDomain, viewDomain, epDomains) => {
  let domain = null;
  let parentDomain = null;
  const uniqParentsDomains =
    _pull(_uniq([pageDomain, workspaceDomain, viewDomain]), wildcardCharacter);
  if (uniqParentsDomains.length === 1) {
    parentDomain = uniqParentsDomains[0];
  } else if (uniqParentsDomains.length === 0) {
    parentDomain = wildcardCharacter;
  }
  const uniqEpDomains = _pull(_uniq(epDomains), wildcardCharacter);
  if (uniqEpDomains.length === 1) {
    domain = (parentDomain === wildcardCharacter || uniqEpDomains[0] === parentDomain)
      ? uniqEpDomains[0] : null;
  } else if (uniqEpDomains.length === 0) {
    domain = parentDomain;
  }
  const colorObject = Domainscolors.find(obj => Object.keys(obj)[0] === domain);
  return colorObject !== undefined ? colorObject[domain] : null;
};

export const getBorderColorForTab = (workspaceDomain, pageDomain, viewsDomains, epDomains) => {
  let domain = null;
  if (pageDomain !== workspaceDomain) {
    if (pageDomain === wildcardCharacter || workspaceDomain === wildcardCharacter) {
      domain = pageDomain === wildcardCharacter ? workspaceDomain : pageDomain;
    } else {
      domain = null;
    }
  } else if (pageDomain === wildcardCharacter) {
    if (viewsDomains.length === 1) {
      domain = epDomains.length === 1 && viewsDomains[0] === epDomains[0] ? viewsDomains[0] : null;
      if (epDomains.length === 0) {
        domain = viewsDomains[0];
      }
    } else if (viewsDomains.length === 0) {
      if (epDomains.length === 1) {
        domain = epDomains[0];
      } else if (epDomains.length === 0) {
        domain = wildcardCharacter;
      }
    }
  } else {
    domain = pageDomain;
  }

  const colorObject = Domainscolors.find(obj => Object.keys(obj)[0] === domain);
  return colorObject !== undefined ? colorObject[domain] : '#CCC';
};

export const getBorderColorForNav = (workspaceDomain, pages, viewsDomains) => {
  let domain = null;
  if (workspaceDomain !== wildcardCharacter) {
    domain = workspaceDomain;
  } else {
    const pagesDomains = _pull(_pull(_uniq(_map(pages, 'domainName')), wildcardCharacter), undefined);
    if (pagesDomains.length === 1) {
      domain = pagesDomains[0];
    } else if (pagesDomains.length === 0) { // pages domains = wildcard, we need to get views domains
      let flatViewsDomains = [];
      const epDomains = _uniq(_flatMap(pages, (page) => {
        const { configurations } = page;
        flatViewsDomains = _uniq(flatViewsDomains.concat(viewsDomains[page.pageId]));
        return _pull(_uniq(
          [].concat(
            [],
            ...configurations.map(configuration =>
              _.get(configuration, 'entryPoints', []).map(
                entryPoint => entryPoint.connectedData.domain
              )
            )
          )
        ), wildcardCharacter);
      }));


      const domains = _pull(_uniq(epDomains.concat(flatViewsDomains)), wildcardCharacter);
      domain = domains.length === 1 ? domains[0] : null;
    }
  }
  const colorObject = Domainscolors.find(obj => Object.keys(obj)[0] === domain);
  return colorObject !== undefined ? colorObject[domain] : '#CCC';
};

export const getColorWithDomainDetermination =
  (workspaceDomain, pagesDomains, viewsDomains, EpsDomains, from) => {
    let color = '#AAAAAA';
    const domain =
      domainDeterminationForColor(workspaceDomain, pagesDomains, viewsDomains, EpsDomains, from);
    if (domain) {
      const colorObject = Domainscolors.find(obj => Object.keys(obj)[0] === domain);
      color = colorObject ? colorObject[domain] : '#AAAAAA';
    }
    return color;
  };

export default {
  colors,
  getStateColorsCSSVars,
};
