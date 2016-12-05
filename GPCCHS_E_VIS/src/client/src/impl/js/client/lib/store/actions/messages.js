import simple from '../simpleActionCreator';
import * as types from '../types';

export const add = simple(
  types.WS_MESSAGE_ADD,
  'instanceType', // global, views
  'type', // danger, success, info, warning
  'message',
  'instanceId'
);
export const remove = simple(
  types.WS_MESSAGE_REMOVE,
  'instanceType',
  'index',
  'instanceId'
);
