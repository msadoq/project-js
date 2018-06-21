import * as types from 'store/types';
import _getOr from 'lodash/fp/getOr';
import _has from 'lodash/fp/has';
import _set from 'lodash/fp/set';

const initialConfiguration = {
  tables: {
    enabledApids: {
      name: 'Enabled Apids',
      sorting: {
        colName: 'apid',
        direction: 'DESC',
      },
      cols: [
        {
          title: 'apid',
          value: 'apid',
          position: 0,
          displayed: true,
          group: 0,
        },
        {
          title: 'name',
          value: 'name',
          position: 1,
          displayed: true,
          group: 0,
        },
        {
          title: 'updateType',
          value: 'updateType',
          position: 2,
          displayed: true,
          group: 0,
        },
        {
          title: 'updateTime',
          value: 'updateTime',
          displayed: true,
          position: 3,
          group: 0,
        },
      ],
    },
    subSchedules: {
      name: 'Sub Schedules',
      sorting: {
        colName: 'apid',
        direction: 'DESC',
      },
      cols: [
        {
          title: 'ssid',
          value: 'ssid',
          position: 0,
          displayed: true,
          group: 0,
        },
        {
          title: 'ssidLabel',
          value: 'ssidLabel',
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
          title: 'firstTcTime',
          value: 'firstTcTime',
          displayed: true,
          position: 4,
          group: 0,
        },
        {
          title: 'updateType',
          value: 'updateType',
          displayed: true,
          position: 5,
          group: 0,
        },
        {
          title: 'updateTime',
          value: 'updateTime',
          displayed: true,
          position: 6,
          group: 0,
        },
        {
          title: 'nbTc',
          value: 'nbTc',
          displayed: true,
          position: 7,
          group: 0,
        },
      ],
    },
    commands: {
      name: 'Commands',
      sorting: {
        colName: 'apid',
        direction: 'DESC',
      },
      cols: [
        {
          title: 'apid',
          value: 'apid',
          position: 0,
          displayed: true,
          group: 0,
        },
        {
          title: 'ssid',
          value: 'ssid',
          position: 1,
          displayed: true,
          group: 0,
        },
        {
          title: 'cmdName',
          value: 'cmdName',
          position: 2,
          displayed: true,
          group: 0,
        },
        {
          title: 'cmdShortDescription',
          value: 'cmdShortDescription',
          displayed: true,
          position: 3,
          group: 0,
        },
        {
          title: 'cmdApName',
          value: 'cmdApName',
          displayed: true,
          position: 4,
          group: 0,
        },
        {
          title: 'seqCount',
          value: 'seqCount',
          displayed: true,
          position: 5,
          group: 0,
        },
        {
          title: 'sourceId',
          value: 'sourceId',
          displayed: true,
          position: 6,
          group: 0,
        },
        {
          title: 'cmdStatus',
          value: 'cmdStatus',
          displayed: true,
          position: 7,
          group: 0,
        },
        {
          title: 'groundStatus',
          value: 'groundStatus',
          displayed: true,
          position: 8,
          group: 0,
        },
        {
          title: 'initExecTime',
          value: 'initExecTime',
          displayed: true,
          position: 9,
          group: 0,
        },
        {
          title: 'curExecTime',
          value: 'curExecTime',
          displayed: true,
          position: 10,
          group: 0,
        },
        {
          title: 'totTimeShift',
          value: 'totTimeShift',
          displayed: true,
          position: 11,
          group: 0,
        },
        {
          title: 'updateType',
          value: 'updateType',
          displayed: true,
          position: 12,
          group: 0,
        },
        {
          title: 'updateTime',
          value: 'updateTime',
          displayed: true,
          position: 13,
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
  ['enabledApids', 'subSchedules', 'commands'].indexOf(action.payload.tableId) !== -1
;
