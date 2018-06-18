// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// VERSION : 2.0.0 : DM : #5806 : 24/10/2017 : Store hardcoded GMA entryPoint in the state
//  GroudAlarmViewConfiguration
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0.2 : FA : #11854 : 18/04/2018 : Vima JS does not receive PUB/SUB data
// END-HISTORY
// ====================================================================

import _get from 'lodash/get';
import _map from 'lodash/map';
import { PROVIDER_FLOW_ALL } from '../constants';

/**
 * Generate a predictable flat dataId for a given dataId Object
 * @param dataId {catalog, parameterName, comObject, sessionId, domainId }
 * @param filters
 * @param mode
 * @returns {string} tbdId
 */
export default (dataId, filters = [], mode = '') => {
  const {
    catalog,
    parameterName,
    comObject,
    sessionId,
    domainId,
    provider,
  } = dataId;
  const _provider = !provider || provider === PROVIDER_FLOW_ALL ? '' : provider;
  const _mode = mode || '';
  return `${catalog}.${parameterName}<${comObject}>:${sessionId}:${domainId}:${_provider}:${flattenFilters(filters)}:${_mode}`;
};

function flattenFilters(filters = []) {
  if (!filters.length) {
    return '';
  }
  const filterStr = filters.map(({ field, operator, operand }) => `${field}.${operator}.${operand}`);
  return filterStr.join();
}

/**
 * @param tbdId
 * @returns {RegExpExecArray | null}
 */
export const explodeTbdId = (tbdId) => {
  const regex = /^([^.]*)\.([^<]*)<([^>]*)>:([^:]*):([^:]*):([^:]*):([^:]*):(.*)/i;
  return regex.exec(tbdId);
};

/**
 * @param tbdId
 * @returns {{catalog: *, parameterName: *, comObject: *, sessionId: *, domainId: *, provider: *}}
 */
export const getDataId = (tbdId) => {
  const match = explodeTbdId(tbdId);
  return {
    catalog: _get(match, 1, ''),
    parameterName: _get(match, 2, ''),
    comObject: _get(match, 3, ''),
    sessionId: parseInt(_get(match, 4, ''), 10),
    domainId: parseInt(_get(match, 5, ''), 10),
    provider: _get(match, 6, ''),
  };
};

/**
 * @param tbdId
 * @returns {*}
 */
export const getFilters = (tbdId) => {
  const match = explodeTbdId(tbdId);
  const splitted = _get(match, 7, '');
  const arrayFilters = [];

  _map(splitted.split(','), (filters) => {
    const filter = filters.split('.');
    if (filter.length === 3) {
      arrayFilters.push({
        field: filter[0],
        operator: filter[1],
        operand: filter[2],
      });
    }
  });

  return arrayFilters;
};

/**
 * @param tbdId
 * @returns {*}
 */
export const getMode = (tbdId) => {
  const match = explodeTbdId(tbdId);
  return _get(match, 8, '');
};
