import {
  WEBSOCKET_STATUS,
} from '../actions/websocket';

export default function websocket(state = {
  status: 'disconnect',
  err: null,
}, action) {
  switch (action.type) {
    case WEBSOCKET_STATUS:
      return {
        status: action.status,
        err: action.err,
      };
    default:
      return state;
  }
}
