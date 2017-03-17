import globalConstants from 'common/constants';
import * as types from '../../types';

const initialState = {
  dcStatus: globalConstants.HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'congestion')
  hssStatus: globalConstants.HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'warning', 2:'error')
  mainStatus: globalConstants.HEALTH_STATUS_HEALTHY, // enum(0:'healthy', 1:'warning', 2:'error')
  windowsStatus: {}, // object
  lastPubSubTimestamp: null, // number
};

export default function health(state = initialState, action) {
  switch (action.type) {
    case types.HSS_UPDATE_DC_STATUS:
      return Object.assign(
        {},
        state,
        { dcStatus: action.payload.status }
      );
    case types.HSS_UPDATE_HEALTH_STATUS:
      return Object.assign(
        {},
        state,
        { hssStatus: action.payload.status }
      );
    case types.HSS_UPDATE_MAIN_STATUS:
      return Object.assign(
        {},
        state,
        { mainStatus: action.payload.status }
      );
    case types.HSS_UPDATE_WINDOW_STATUS:
      return Object.assign(
        {},
        state,
        {
          windowsStatus: {
            ...state.windowsStatus,
            [action.payload.windowId]: action.payload.status,
          },
        }
      );
    case types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP:
      return Object.assign(
        {},
        state,
        { lastPubSubTimestamp: action.payload.timestamp }
      );
    default:
      return state;
  }
}
