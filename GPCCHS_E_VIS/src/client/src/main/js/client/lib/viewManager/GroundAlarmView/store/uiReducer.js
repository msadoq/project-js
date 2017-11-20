/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import * as types from '../../../store/types';
import * as constants from '../../constants';

const initialState = {};
const initialViewState = {
  selected: {},
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
    case types.HSC_CLOSE_WORKSPACE:
    case types.HSC_PLAY:
    case types.WS_TIMEBAR_UPDATE_CURSORS: {
      return initialState;
    }
    case types.WS_VIEW_GMA_ALARM_ACK:
    case types.WS_VIEW_OBA_ALARM_ACK:
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

export const getSort = createSelector(
  getUi,
  _.get('sort')
);
