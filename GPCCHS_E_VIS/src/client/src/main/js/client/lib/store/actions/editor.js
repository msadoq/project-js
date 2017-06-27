import * as types from '../types';
import simple from '../helpers/simpleActionCreator';


export const openCodeEditor = simple(types.WS_WINDOW_OPEN_CODE_EDITOR, 'viewId');
export const closeCodeEditor = simple(types.WS_WINDOW_CLOSE_CODE_EDITOR);
