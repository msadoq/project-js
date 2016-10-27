import simple from '../simpleActionCreator';
import * as types from '../types';

export const add = simple(types.WS_VIEW_ADD, 'viewId', 'type', 'configuration');
export const remove = simple(types.WS_VIEW_REMOVE, 'viewId');
