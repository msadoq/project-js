import _get from 'lodash/get';
import _has from 'lodash/has';
import * as types from '../types';

export default function messages(state = { global: [
  { message: 'Hello', type: 'danger' },
  { message: 'Roger', type: 'danger' },
  { message: 'Hello', type: 'danger' },
  { message: 'Machin', type: 'warning' },
  { message: 'bien', type: 'info' },
  { message: 'OK', type: 'success' },
] }, action) {
  switch (action.type) {
    case types.WS_MESSAGE_ADD: {
      const { containerId } = action.payload;
      const list = _get(state, [containerId], [])
        .concat(message(undefined, action));
      return Object.assign({}, state, { [containerId]: list });
    }
    case types.WS_MESSAGE_REMOVE: {
      const { containerId, index } = action.payload;
      const list = _get(state, [containerId]);
      if (!list || !_has(list, index)) {
        return state;
      }
      return Object.assign({}, state, {
        [containerId]: [].concat(list.slice(0, index), list.slice(index + 1)),
      });
    }
    case types.WS_MESSAGE_RESET: {
      const { containerId } = action.payload;
      if (!_has(state, containerId)) {
        return state;
      }
      return Object.assign({}, state, { [containerId]: [] });
    }
    default:
      return state;
  }
}

function message(state = {
  message: null,
  type: 'danger', // success, warning, danger, info
}, action) {
  switch (action.type) {
    case types.WS_MESSAGE_ADD:
      return Object.assign({}, state, {
        message: action.payload.message || state.message,
        type: (action.payload.type === 'error'
          ? 'danger'
          : action.payload.type) || state.type,
      });
    default:
      return state;
  }
}
