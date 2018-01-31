// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import _get from 'lodash/get';
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
  const obsolete = _get(payload, 'isObsolete.value', false);
  const significant = _get(payload, 'isNominal.value', true);
  const monitoringColor = getStateColor(obsolete, significant, monitoringState);
  // if no monitoring state has been found, there is a conf error to raise
  if (!monitoringColor) {
    // @todo raise an error
    return { color: null };
  }

  // A monitoring color has been found for the tuple obsolete / significant (@see Mantis #8520)
  // Check if that state is customizable
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
