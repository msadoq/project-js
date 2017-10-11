import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from '../../../viewManager';

export const getAlarmMode = createSelector(
  getConfigurationByViewId,
  _.get('alarmMode')
);

export const getAlarmDomain = createSelector(
  getConfigurationByViewId,
  _.get('alarmDomain')
);

export const getAlarmTimeline = createSelector(
  getConfigurationByViewId,
  _.get('alarmTimeline')
);
