import * as types from '../types';
import simple from '../helpers/simpleActionCreator';

export const openHtmlEditor = simple(types.WS_WINDOW_OPEN_HTML_EDITOR, 'viewId');
export const closeHtmlEditor = simple(types.WS_WINDOW_CLOSE_HTML_EDITOR);
