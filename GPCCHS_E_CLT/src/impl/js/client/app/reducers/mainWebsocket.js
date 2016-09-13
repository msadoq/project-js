import {
  MAIN_WEBSOCKET_STATUS,
} from '../actions/mainWebsocket';

export default function mainWebsocket(state = {
  status: 'disconnected', // connected, disconnected, error
  err: null,
}, action) {
  switch (action.type) {
    case MAIN_WEBSOCKET_STATUS:
      return Object.assign({}, state, {
        status: action.status,
        err: action.err,
      });
    default:
      return state;
  }
}
