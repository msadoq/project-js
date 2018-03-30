import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import * as types from 'store/types';
import { getConfigurationByViewId } from 'viewManager';

const initialConfiguration = {
  search: { enabled: true },
  cols: [
    {
      title: 'timestamp',
      value: 'timestamp',
      position: 0,
      displayed: true,
      group: 0,
    },
    {
      title: 'parameterName',
      value: 'parameterName',
      position: 1,
      displayed: true,
      group: 0,
    },
    {
      title: 'parameterType',
      value: 'parameterType',
      position: 2,
      displayed: true,
      group: 0,
    },
    {
      title: 'firstOccurence',
      value: 'firstOccurence',
      displayed: true,
      position: 3,
      group: 0,
    },
    {
      title: 'lastOccurence',
      value: 'lastOccurence',
      displayed: true,
      position: 4,
      group: 0,
    },
    {
      title: 'durationtimestamp',
      value: 'durationtimestamp',
      displayed: true,
      position: 5,
      group: 0,
    },
    {
      title: 'rawValuetimestamp',
      value: 'rawValuetimestamp',
      displayed: true,
      position: 6,
      group: 0,
    },
    {
      title: 'physicalValue',
      value: 'physicalValue',
      displayed: true,
      position: 7,
      group: 0,
    },
    {
      title: 'satellite',
      value: 'satellite',
      displayed: true,
      position: 8,
      group: 0,
    },
    {
      title: 'ackStatetimestamp',
      value: 'ackStatetimestamp',
      displayed: true,
      position: 9,
      group: 0,
    },
  ],
};

export default (stateConf = {}, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      return {
        ...initialConfiguration,
        ...action.payload.view.configuration,
      };
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
      return _.update('search', _.pick('enabled'), stateConf);
    }
    case types.WS_VIEW_ALARM_INPUT_TOGGLE: {
      return _.update('search.enabled', _.negate(_.identity), stateConf);
    }
    case types.WS_VIEW_UPDATE_TABLE_COLS: {
      return _.set('columns', action.payload.columns, stateConf);
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
    _.omit('enabled'),
    _.omitBy(_.equals('')) // reject empty values
  )
);

export const getEnableSearch = createSelector(
  getConfigurationByViewId,
  _.getOr(false, 'search.enabled')
);

export const getTableColumns = createSelector(
  getConfigurationByViewId,
  _.getOr([], 'columns')
);
