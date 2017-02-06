import * as types from '../types';

const initialState = {
  lastPubSubTimestamp: null, // number
  dcStatus: null, // enum(0:'healthy', 1:'congestion')
  hssStatus: null, // enum(0:'healthy', 1:'warning', 2:'error')
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
    default:
      return state;
  }
}
