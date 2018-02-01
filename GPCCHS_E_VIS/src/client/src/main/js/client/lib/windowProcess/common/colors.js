// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : StateColors serialized in localid and present in viewData
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// END-HISTORY
// ====================================================================

import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _first from 'lodash/first';
import _find from 'lodash/find';
import _memoize from 'lodash/memoize';
import { get } from 'common/configurationManager';

export const STATE_COLOR_NOMINAL = 'nominal';
export const STATE_COLOR_WARNING = 'warning';
export const STATE_COLOR_ALARM = 'danger';
export const STATE_COLOR_SEVERE = 'severe';
export const STATE_COLOR_CRITICAL = 'critical';
export const STATE_COLOR_OUT_OF_RANGE = 'outOfRange';
export const STATE_COLOR_TYPES = [
  STATE_COLOR_NOMINAL,
  STATE_COLOR_WARNING,
  STATE_COLOR_ALARM,
  STATE_COLOR_SEVERE,
  STATE_COLOR_CRITICAL,
  STATE_COLOR_OUT_OF_RANGE,
];

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
  () => Object.keys(getStateColors()).map(k => ({
    [`--monit-${k}`]: getStateColors()[k],
  }))
  .reduce((acc, c) => ({
    ...acc,
    ...c,
  }), {});

export default {
  colors,
  getStateColorsCSSVars,
};
