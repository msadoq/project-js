/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import * as types from 'store/types';
import * as constants from 'viewManager/constants';

const initialState = {};
const initialViewState = {
  ackStatus: {},
  selected: {},
  expanded: {},
  sort: {
    mode: 'ASC',
    column: 'timestamp',
  },
};

const isAlarm = view => (
  view.type === constants.VM_VIEW_GROUNDALARM
  || view.type === constants.VM_VIEW_ONBOARDALARM
);

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK: {
      if (isAlarm(action.payload.view)) {
        return { ...state, [action.payload.view.uuid]: initialViewState };
      }
      return state;
    }
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED: {
      const { views } = action.payload;
      if (!views) {
        return state;
      }
      const newState = {};
      views.forEach((view) => {
        if (isAlarm(view)) {
          newState[view.uuid] = initialViewState;
        }
      });
      return { ...state, ...newState };
    }
    case types.WS_VIEW_ALARM_TOGGLE_SELECTION: {
      const { viewId, oid } = action.payload;
      const path = [viewId, 'selected', oid];
      if (_.get(path, state) === true) {
        return _.unset(path, state);
      }
      return _.set(path, true, state);
    }
    case types.WS_VIEW_ALARM_TOGGLE_SORT: {
      const { viewId, column } = action.payload;
      const toggleMode = mode => (mode === 'ASC' ? 'DESC' : 'ASC');
      const currentSortColumn = _.get([viewId, 'sort', 'column'], state);
      if (currentSortColumn === column) {
        return _.update([viewId, 'sort', 'mode'], toggleMode, state);
      }
      return _.set([viewId, 'sort'], { column, mode: 'ASC' }, state);
    }
    case types.WS_VIEW_ALARM_COLLAPSE: {
      const { viewId, oid } = action.payload;
      return _.unset([viewId, 'expanded', oid], state);
    }
    case types.WS_VIEW_ALARM_UNCOLLAPSE: {
      const { viewId, oid } = action.payload;
      return _.set([viewId, 'expanded', oid], true, state);
    }
    case types.HSC_CLOSE_WORKSPACE: {
      return _.mapValues(_.always(initialViewState), state);
    }
    case types.WS_VIEW_UPDATE_ENTRYPOINT: {
      const { viewId } = action.payload;
      return _.unset([viewId, 'selected'], state);
    }
    case types.WS_VIEW_CLOSE: {
      const { viewId } = action.payload;
      return _.unset(viewId, state);
    }
    case types.WS_PAGE_CLOSE: {
      return _.unset(action.payload.viewIds, state);
    }
    case types.WS_MODAL_OPEN: {
      const { type, viewId, ackId, alarmsOids } = action.payload.props;
      if (type === 'gmaAck' || type === 'obaAck') {
        return _.set([viewId, 'ackStatus', ackId], {
          acknowledging: false,
          alarmsOids: alarmsOids.map(oid => ({
            oid,
            acknowledged: false,
            ackError: null,
          })),
        }, state);
      }
      return state;
    }
    case types.WS_MODAL_CLOSED: {
      const { type, viewId, ackId } = action.payload.props;
      if (type === 'gmaAck' || type === 'obaAck') {
        return _.unset([viewId, 'ackStatus', ackId], state);
      }
      return state;
    }
    case types.WS_VIEW_ALARM_ACK: {
      const { viewId, ackId } = action.payload;
      return _.pipe(
        _.unset([viewId, 'selected']),
        _.set([viewId, 'ackStatus', ackId, 'acknowledging'], true)
      )(state);
    }
    case types.WS_VIEW_ALARM_ACK_SUCCESS: {
      const { viewId, ackId, oid } = action.payload;
      if (!state[viewId].ackStatus[ackId]) {
        return state;
      }
      const { alarmsOids } = state[viewId].ackStatus[ackId];
      const iOid = _.findIndex(_.propEq('oid', oid), alarmsOids);
      return _.set([viewId, 'ackStatus', ackId, 'alarmsOids', iOid, 'acknowledged'], true, state);
    }
    case types.WS_VIEW_ALARM_ACK_FAILURE: {
      const { viewId, ackId, oid, error } = action.payload;
      if (!state[viewId].ackStatus[ackId]) {
        return state;
      }
      const { alarmsOids } = state[viewId].ackStatus[ackId];
      const iOid = _.findIndex(_.propEq('oid', oid), alarmsOids);
      return _.set([viewId, 'ackStatus', ackId, 'alarmsOids', iOid, 'ackError'], String(error), state);
    }
    default:
      return state;
  }
};

export default uiReducer;

const getUi = (state, { viewId }) => (
  _.get(['AlarmViewUi', viewId], state)
);

export const getSelectedAlarms = createSelector(
  getUi,
  _.getOr({}, 'selected')
);

export const getExpandedAlarms = createSelector(
  getUi,
  _.getOr({}, 'expanded')
);

export const getSort = createSelector(
  getUi,
  _.get('sort')
);

export const getSortColumn = createSelector(
  getSort,
  _.get('column')
);

export const getSortMode = createSelector(
  getSort,
  _.get('mode')
);

export const getAckStatus = createSelector(
  getUi,
  (state, { ackId }) => ackId,
  (ui, ackId) => _.get(['ackStatus', ackId], ui)
);
