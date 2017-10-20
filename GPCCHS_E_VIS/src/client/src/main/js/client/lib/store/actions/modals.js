import simple from '../helpers/simpleActionCreator';
import * as types from '../types';
import { getFocusedWindowId } from '../reducers/hsc';

export const open = simple(
  types.WS_MODAL_OPEN,
  'windowId',
  'props'
);

export const close = simple(
  types.WS_MODAL_CLOSE,
  'windowId',
  'props',
  'choice'
);

export const openInCurrentWindow = props => (dispatch, getState) => {
  const windowId = getFocusedWindowId(getState());
  return dispatch(open(windowId, props));
};
