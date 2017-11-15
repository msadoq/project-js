import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import * as types from '../../../store/types';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case types.WS_VIEW_CLOSE:
    case types.WS_VIEW_GMA_ALARM_ACK:
    case types.WS_VIEW_OBA_ALARM_ACK:
    case types.WS_VIEW_UPDATE_ENTRYPOINT: {
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

export default reducer;

const getUi = (state, { viewId }) => (
  _.get(['AlarmViewUi', viewId], state)
);

export const getSelectedAlarms = createSelector(
  getUi,
  _.getOr({}, 'selected')
);
