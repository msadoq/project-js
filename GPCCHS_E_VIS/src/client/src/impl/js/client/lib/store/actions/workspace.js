import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const updatePath = simple(types.WS_UPDATE_PATH, 'folder', 'file');
