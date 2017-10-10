import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getView, getViewType } from '../store/reducers/views';
import * as constants from './constants';

export const getConfigurationByViewId = createSelector(
  state => state,
  (state, { viewId }) => viewId,
  getViewType,
  (state, viewId, viewType) => _.get(`${viewType}Configuration.${viewId}`, state)
);

export const getViewWithConfiguration = createSelector(
  getView,
  getConfigurationByViewId,
  (view, configuration) => _.set('configuration', configuration, view)
);


export function getEntryPointsByViewId(state, { viewId }) {
  const type = getViewType(state, { viewId });
  if (type === constants.VM_VIEW_GROUNDALARM || type === constants.VM_VIEW_ONBOARDALARM) {
    // get configuration for session and domain
    const configuration = state[type.concat('Configuration')][viewId];
    if (!configuration) {
      return [];
    }
    let formula = 'GroundMonitoringAlarm';
    let epName = 'groundAlarmEP';
    if (type === constants.VM_VIEW_ONBOARDALARM) {
      formula = 'logbookEvent'; // event type for onboard alarm
      epName = 'onboardAlarmEP';
    }
    // TODO !!!! remove domain and timeline default !!!
    return [{
      connectedData: {
        domain: configuration.domain || 'fr.cnes.isis',
        formula,
        filter: configuration.filter,
        timeline: configuration.timeline || 'Session 1',
      },
      name: epName,
    }];
  }
  return _.get(`${type}Configuration.${viewId}.entryPoints`, state);
}
