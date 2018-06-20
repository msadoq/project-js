import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

export const sendArchiveQuery =
  simple(types.WS_OBSOLETE_EVENT_ADD, 'tbdId', 'dataId', 'intervals');
export const removeObsoleteEvents = simple(types.WS_OBSOLETE_EVENT_DELETE, 'tbdId', 'intervals');
export const resetObsoleteEvents = simple(types.RESET_OBSOLETE_EVENTS, 'tbdIdInterval');
