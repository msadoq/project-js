import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const importPayload = simple(types.DATA_IMPORT_PAYLOADS, 'payload');
