import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const open = simple(
  types.WS_MODAL_OPEN,
  'windowId',
  'props'
);

export const close = simple(
  types.WS_MODAL_CLOSE,
  'windowId'
);
