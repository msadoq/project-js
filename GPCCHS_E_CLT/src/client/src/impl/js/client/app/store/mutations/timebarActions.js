import simple from './simpleActionCreator';
import * as types from './types';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMEBAR_ADD, 'timebarId', 'configuration');
export const remove = simple(types.WS_TIMEBAR_REMOVE, 'timebarId');
