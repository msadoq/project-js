// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// VERSION : 2.0.0 : FA : #8416 : 10/10/2017 : Fix stateColor applying for all types
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Remove monitoring state colors mecanism + add
//  defult values for state colors + update unit tests + fix issue when removing a state color +
//  fix css code style
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 31/01/2018 : surveillance du monitoringState pour
//  parametres TM VIMA
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import _get from 'lodash/get';
import { SIGNIFICANT_VALIDITY_STATE_STRING_VALUE } from 'constants';
import { applyFilter } from './applyFilters';
import { getStateColor, STATE_COLOR_NOMINAL } from '../../windowProcess/common/colors';

/**
 * @param payload
 * @param customColors
 * @param monitoringState
 * @returns {*}
 */
const getStateColorObj = (
  payload = {},
  customColors = [], // operator's defined
  monitoringState = STATE_COLOR_NOMINAL
) => {
  const obsolete = _get(payload, 'isDataObsolete', false);
  const validityStateValue = _get(payload, 'validityState.value', false);
  const validityState = _get(payload, 'validityState', null);
  let significant;
  if (validityStateValue) {
    significant = _get(payload, 'validityState.value', 2) === 2;
  } else if (typeof validityState === 'string') {
    significant = _get(payload, 'validityState', SIGNIFICANT_VALIDITY_STATE_STRING_VALUE).toUpperCase() === SIGNIFICANT_VALIDITY_STATE_STRING_VALUE;
  }
  const monitoringColor = getStateColor(obsolete, significant, monitoringState);
  // if no monitoring state has been found, there is a conf error to raise
  if (!monitoringColor) {
    // @todo raise an error
    return { color: null };
  }

  // A monitoring color has been found for the tuple obsolete / significant (@see Mantis #8520)
  // Check if that state is customizable<<
  // if not, returns the default color defined
  if (_get(monitoringColor, 'customize', false) === false) {
    return {
      color: _get(monitoringColor, 'color', null),
    };
  }
  // some custom colors has been defined
  if (customColors) {
    // lookup for a custom color that can be applyable to current payload
    const customColor = _.find(
      customColors,
      c => (applyFilter(payload, c.condition) ? c.color : false)
    );
    // if one matches, return it
    if (customColor) {
      return {
        color: customColor.color,
      };
    }
  }

  // default, returns the fallback color from config
  return {
    color: _get(monitoringColor, 'color', null),
  };
};

export default {
  getStateColorObj,
};
