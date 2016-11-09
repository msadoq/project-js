import simple from '../simpleActionCreator';
import * as types from '../types';

export const add = simple(types.WS_VIEW_ADD, 'viewId', 'type', 'configuration', 'path', 'oId');
export const remove = simple(types.WS_VIEW_REMOVE, 'viewId');
export const updatePath = simple(types.WS_VIEW_UPDATEPATH, 'oldFolder', 'newFolder');
