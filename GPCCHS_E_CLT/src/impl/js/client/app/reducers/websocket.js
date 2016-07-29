import {
  WEBSOCKET_STATUS,
  WEBSOCKET_STUB_TOGGLE,
} from '../actions/websocket';

export default function websocket(state = {
  status: 'disconnect',
  err: null,
  stub: false,
}, action) {
  switch (action.type) {
    case WEBSOCKET_STATUS:
      return Object.assign({}, state, {
        status: action.status,
        err: action.err,
      });
    case WEBSOCKET_STUB_TOGGLE:
      return Object.assign({}, state, {
        stub: !state.stub,
      });
    default:
      return state;
  }
}
