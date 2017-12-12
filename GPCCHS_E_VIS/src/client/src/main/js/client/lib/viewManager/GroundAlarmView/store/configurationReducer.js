import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import * as types from 'store/types';
import { getConfigurationByViewId } from 'viewManager';

export default (stateConf = {}, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      return action.payload.view.configuration;
    }
    case types.WS_VIEW_UPDATE_ALARMDOMAIN:
      return _.set('entryPoints[0].connectedData.domain', action.payload.domainName, stateConf);
    case types.WS_VIEW_UPDATE_ALARMTIMELINE:
      return _.set('entryPoints[0].connectedData.timeline', action.payload.timelineName, stateConf);
    case types.WS_VIEW_UPDATE_ALARMMODE: {
      return _.set('entryPoints[0].connectedData.mode', action.payload.mode, stateConf);
    }
    case types.WS_VIEW_ALARM_INPUT_SEARCH: {
      const { column, value } = action.payload;
      return _.set(['search', column], value, stateConf);
    }
    case types.WS_VIEW_ALARM_INPUT_RESET: {
      return _.set(['search'], {}, stateConf);
    }
    default:
      return stateConf;
  }
};

export const getAlarmMode = createSelector(
  getConfigurationByViewId,
  _.get('entryPoints[0].connectedData.mode')
);

export const getAlarmDomain = createSelector(
  getConfigurationByViewId,
  _.get('entryPoints[0].connectedData.domain')
);

export const getAlarmTimeline = createSelector(
  getConfigurationByViewId,
  _.get('entryPoints[0].connectedData.timeline')
);

export const getSearch = createSelector(
  getConfigurationByViewId,
  _.pipe(
    _.getOr({}, 'search'),
    _.pickBy(_.identity) // reject falsy values
  )
);
