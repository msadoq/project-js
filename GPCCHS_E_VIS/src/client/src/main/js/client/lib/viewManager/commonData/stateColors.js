// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// END-HISTORY
// ====================================================================

import _ from 'lodash';
import { compile } from '../../common/operators';
import { getStateColors } from '../../windowProcess/common/colors';

const getStateColorObj = (payload = {}, customColors = [], monitoringState) => {
  const monitoringColor = _.get(getStateColors(), monitoringState);
  if (monitoringColor) {
    return {
      color: monitoringColor,
    };
  }

  const customColor = _.find(customColors, c =>
    compile(c.condition)(_.get(payload, [c.condition.field, 'value'])));

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
