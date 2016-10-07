import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const add = simple(
  types.WS_CD_ADD,
  'connectedDataId',
  'formula',
  'domain',
  'timeline',
  'filter'
);
export const remove = simple(types.WS_CD_REMOVE, 'connectedDataId');
