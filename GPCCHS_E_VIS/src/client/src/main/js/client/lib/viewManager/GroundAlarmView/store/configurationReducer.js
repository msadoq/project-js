import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import * as types from 'store/types';
import { getConfigurationByViewId } from 'viewManager';
import _getOr from 'lodash/fp/getOr';

const initialConfiguration = {
  search: { enabled: true },
  tables: {
    main: {
      cols: [
        {
          title: 'alarmDate',
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
    },
  },
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
    case types.WS_VIEW_UPDATE_DOMAINNAME:
      return _.set('entryPoints[0].connectedData.domain', action.payload.domainName, stateConf);
    case types.WS_VIEW_UPDATE_SESSIONNAME:
      return _.set('entryPoints[0].connectedData.session', action.payload.sessionName, stateConf);
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
      return isValidTableId(action)
        ? _.set(`tables.${action.payload.tableId}.cols`, _getOr([], 'payload.cols', action), stateConf)
        : stateConf
        ;
    }
    default:
      return stateConf;
  }
};

export const isValidTableId = action =>
  _.has('payload.tableId', action) &&
  ['main'].indexOf(action.payload.tableId) !== -1
;

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

export const getColumns = createSelector(
  getConfigurationByViewId,
  _.get('tables.main.cols')
);
