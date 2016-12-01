import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const add = simple(
  types.WS_MESSAGE_ADD,
  'instanceType',
  'type',
  'message',
  'instanceId'
);
export const remove = simple(
  types.WS_MESSAGE_REMOVE,
  'instanceType',
  'index',
  'instanceId'
);
