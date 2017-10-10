import _ from 'lodash';
import { applyFilter } from './applyFilters';
import { getStateColors } from '../../windowProcess/common/colors';

const getStateColorObj = (payload = {}, customColors = [], monitoringState) => {
  const monitoringColor = _.get(getStateColors(), monitoringState);
  if (monitoringColor) {
    return {
      color: monitoringColor,
    };
  }

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
