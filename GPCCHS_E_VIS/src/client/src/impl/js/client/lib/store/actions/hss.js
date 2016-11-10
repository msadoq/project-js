import simple from '../simpleActionCreator';
import * as types from '../types';

export const remove = simple(types.HSS_WS_REMOVE, 'identity');
export const updateStatus = simple(types.HSS_WS_UPDATE_STATUS, 'identity', 'status', 'error');
