import * as types from '../types';
import simple from '../helpers/simpleActionCreator';
import { pause } from './hsc';
import { getPlayingTimebarId } from '../reducers/hsc';

export const _openHtmlEditor = simple(types.WS_WINDOW_OPEN_HTML_EDITOR, 'viewId');
export const closeHtmlEditor = simple(types.WS_WINDOW_CLOSE_HTML_EDITOR);

export const openHtmlEditor = viewId => (dispatch, getState) => {
  dispatch(_openHtmlEditor(viewId));
  const state = getState();
  const playingTimebarUuid = getPlayingTimebarId(state);
  if (playingTimebarUuid) {
    dispatch(pause());
  }
};
