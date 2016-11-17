/* eslint import/prefer-default-export:0 */
import simple from '../simpleActionCreator';
import * as types from '../types';

export const updatePath = simple(types.WS_UPDATE_PATH, 'folder', 'file');
export const closeWorkspace = simple(types.WS_CLOSE_WORKSPACE);
