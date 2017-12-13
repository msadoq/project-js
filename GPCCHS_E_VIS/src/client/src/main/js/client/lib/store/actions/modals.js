// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Can now propagate choice and modal props via closeModal action
// END-HISTORY
// ====================================================================

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

export const modalClosed = simple(
  types.WS_MODAL_CLOSED,
  'windowId',
  'props'
);

export const openInCurrentWindow = props => (dispatch, getState) => {
  const windowId = getFocusedWindowId(getState());
  return dispatch(open(windowId, props));
};
