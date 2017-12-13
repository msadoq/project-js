// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import { applyFilter } from './applyFilters';

const getStateColorObj = (payload = {}, customColors = []) => {
  if (!customColors) {
    return null;
  }

  const customColor = _.find(
    customColors,
    c => (applyFilter(payload, c.condition) ? c.color : false)
  );

  if (customColor) {
    return {
      color: customColor.color,
    };
  }

  return null;
};

export default {
  getStateColorObj,
};
