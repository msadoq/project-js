import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const initialize = simple(types.PUS_TEMP_INITIALIZE, 'pusId', 'apId');
export const subscribe = simple(types.PUS_TEMP_SUBSCRIBE, 'pusId', 'apId');
export const unsubscribe = simple(types.PUS_TEMP_UNSUBSCRIBE, 'pusId', 'apId');
export const compare = simple(types.PUS_TEMP_COMPARE, 'pusId', 'apId', 'date');
export const reset = simple(types.PUS_TEMP_RESET, 'pusId', 'apId', 'date');
