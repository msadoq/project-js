import simple from './simpleActionCreator';
import * as types from './types';

/**
 * Simple actions
 */
export const add = simple(types.WS_ENTRYPOINT_ADD, 'entryPointId', 'title');
export const remove = simple(types.WS_ENTRYPOINT_REMOVE, 'entryPointId');
