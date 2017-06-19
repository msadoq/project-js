import * as types from '../types';
import simple from '../helpers/simpleActionCreator';
import { pause } from './hsc';
import { getPlayingTimebarId } from '../reducers/hsc';

export const _openCodeEditor = simple(types.WS_WINDOW_OPEN_CODE_EDITOR, 'viewId');
export const closeCodeEditor = simple(types.WS_WINDOW_CLOSE_CODE_EDITOR);

export const openCodeEditor = viewId => (dispatch, getState) => {
  dispatch(_openCodeEditor(viewId));
  const state = getState();
  const playingTimebarUuid = getPlayingTimebarId(state);
  if (playingTimebarUuid) {
    dispatch(pause());
  }
};
