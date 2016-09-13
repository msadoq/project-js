import simple from './simpleActionCreator';
import * as types from './types';

/**
 * Simple actions
 */
export const updateStatus = simple(types.HSS_MAIN_UPDATE_STATUS, 'status', 'error');
