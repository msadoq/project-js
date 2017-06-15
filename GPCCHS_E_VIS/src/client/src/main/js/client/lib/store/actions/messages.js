import _ from 'lodash/fp';
import _get from 'lodash/get';
import _find from 'lodash/find';
import simple from '../simpleActionCreator';
import * as types from '../types';

export const add = simple(
  types.WS_MESSAGE_ADD,
  'containerId', // global, view or page id
  'type', // success, warning, danger, info
  (param) => {
    const messages = _.flatten([param]);
    const extractErrors = _.map(x => (x instanceof Error ? x.message : x));
    return { messages: extractErrors(messages) };
  }
);

export const remove = (containerId, index) => (dispatch) => {
  const payload = { containerId, index };
  dispatch({ type: types.WS_MESSAGE_REMOVING, payload });
  setTimeout(() => {
    dispatch({ type: types.WS_MESSAGE_REMOVE, payload });
  }, 400);
};

export const reset = simple(
  types.WS_MESSAGE_RESET,
  'containerId'
);
export function addOnce(containerId, type, message) {
  return (dispatch, getState) => {
    const path = ['messages', containerId];
    const messages = _get(getState(), path);
    const found = !!_find(messages, m => m.message === message);
    if (found) {
      return;
    }

    dispatch(add(containerId, type, message));
  };
}
