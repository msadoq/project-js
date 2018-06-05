import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    onBoardEvents: {
      cols: [
        {
          title: 'rid',
          value: 'rid',
          position: 0,
          displayed: true,
          group: 0,
        },
        {
          title: 'ridLabel',
          value: 'ridLabel',
          position: 1,
          displayed: true,
          group: 0,
        },
        {
          title: 'name',
          value: 'name',
          position: 2,
          displayed: true,
          group: 0,
        },
        {
          title: 'status',
          value: 'status',
          displayed: true,
          position: 3,
          group: 0,
        },
        {
          title: 'eventShortDescription',
          value: 'eventShortDescription',
          displayed: true,
          position: 4,
          group: 0,
        },
        {
          title: 'eventDefaultStatus',
          value: 'eventDefaultStatus',
          displayed: true,
          position: 5,
          group: 0,
        },
        {
          title: 'alarmLevel',
          value: 'alarmLevel',
          displayed: true,
          position: 6,
          group: 0,
        },
        {
          title: 'actionName',
          value: 'actionName',
          displayed: true,
          position: 7,
          group: 0,
        },
        {
          title: 'eventLongDescription',
          value: 'eventLongDescription',
          displayed: true,
          position: 8,
          group: 0,
        },
        {
          title: 'updateType',
          value: 'updateType',
          displayed: true,
          position: 9,
          group: 0,
        },
        {
          title: 'updateTime',
          value: 'updateTime',
          displayed: true,
          position: 10,
          group: 0,
        },
      ],
    },
    receivedOnBoardEvents: {
      cols: [
        {
          title: 'onBoardTime',
          value: 'onBoardTime',
          position: 0,
          displayed: true,
          group: 0,
        },
        {
          title: 'receptionTime',
          value: 'receptionTime',
          position: 1,
          displayed: true,
          group: 0,
        },
        {
          title: 'rid',
          value: 'rid',
          position: 2,
          displayed: true,
          group: 0,
        },
        {
          title: 'ridLabel',
          value: 'ridLabel',
          displayed: true,
          position: 3,
          group: 0,
        },
        {
          title: 'name',
          value: 'name',
          displayed: true,
          position: 4,
          group: 0,
        },
        {
          title: 'reportType',
          value: 'reportType',
          displayed: true,
          position: 5,
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
    case types.WS_VIEW_UPDATE_TABLE_COLS: {
      return isValidTableId(action)
        ? _set(`tables.${action.payload.tableId}.cols`, _getOr([], 'payload.cols', action), stateConf)
        : stateConf
        ;
    }
    default:
      return stateConf;
  }
};

export const isValidTableId = action =>
  _has('payload.tableId', action) &&
  ['onBoardEvents', 'receivedOnBoardEvents'].indexOf(action.payload.tableId) !== -1
;
