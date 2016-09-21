import simple from './simpleActionCreator';
import * as types from './types';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMELINE_ADD, 'timelineId', 'configuration');
export const remove = simple(types.WS_TIMELINE_REMOVE, 'timelineId');
