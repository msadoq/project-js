import _omit from 'lodash/omit';
import * as types from '../types';

const initialState = {
  dcStatus: null, // enum(0:'healthy', 1:'congestion')
  hssStatus: null, // enum(0:'healthy', 1:'warning', 2:'error')
  lastPubSubTimestamp: null, // number
  slowRenderers: [],
};

export default function health(state = initialState, action) {
  switch (action.type) {
    case types.HSS_UPDATE_DC_STATUS:
      return Object.assign(
        {},
        state,
        { dcStatus: action.payload.dcStatus }
      );
    case types.HSS_UPDATE_HSS_STATUS:
      return Object.assign(
        {},
        state,
        { hssStatus: action.payload.hssStatus }
      );
    case types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP:
      return Object.assign(
        {},
        state,
        { lastPubSubTimestamp: action.payload.lastPubSubTimestamp }
      );
    case types.HSC_ADD_SLOW_RENDERER:
      return Object.assign({}, state, {
        slowRenderers: {
          ...state.slowRenderers,
          [action.payload.windowId]: action.payload.interval,
        },
      });
    case types.HSC_REMOVE_SLOW_RENDERER:
      return Object.assign({}, state, {
        slowRenderers: _omit(state.slowRenderers, [action.payload.windowId]),
      });
    default:
      return state;
  }
}
