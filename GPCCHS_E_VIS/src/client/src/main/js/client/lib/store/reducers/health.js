import * as types from '../types';

const initialState = {
  dcStatus: null, // enum(0:'healthy', 1:'congestion')
  hssStatus: null, // enum(0:'healthy', 1:'warning', 2:'error')
  mainStatus: null, // enum(0:'healthy', 1:'warning', 2:'error')
  windowsStatus: null, // object
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
    case types.HSS_UPDATE_WINDOWS_STATUS:
      return Object.assign(
        {},
        state,
        { windowsStatus: action.payload.status }
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
