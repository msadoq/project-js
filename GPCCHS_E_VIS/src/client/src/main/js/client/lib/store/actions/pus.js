import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const initialize = simple(types.PUS_TEMP_INITIALIZE, 'payload');
export const subscribe = simple(types.PUS_TEMP_SUBSCRIBE, 'payload');
export const unsubscribe = simple(types.PUS_TEMP_UNSUBSCRIBE, 'payload');
export const compare = simple(types.PUS_TEMP_COMPARE, 'payload');
export const reset = simple(types.PUS_TEMP_RESET, 'payload');
