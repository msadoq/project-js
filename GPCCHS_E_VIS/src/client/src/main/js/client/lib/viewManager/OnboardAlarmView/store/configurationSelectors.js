import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from '../../../viewManager';

export const getAlarmDomain = createSelector(
  getConfigurationByViewId,
  _.get('alarmDomain')
);

export const getAlarmTimeline = createSelector(
  getConfigurationByViewId,
  _.get('alarmTimeline')
);
