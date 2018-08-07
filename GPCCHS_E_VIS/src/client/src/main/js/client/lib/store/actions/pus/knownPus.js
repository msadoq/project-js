import simple from '../../helpers/simpleActionCreator';
import * as types from '../../types';

// intervals can be a simple array for 1 interval or an array of arrays for multiple intervals
export const sendArchiveQuery =
  simple(types.WS_KNOWN_PUS_INTERVAL_ADD, 'pusService', 'id', 'apidName', 'intervals');
export const removeKnownPus = simple(types.WS_KNOWN_PUS_INTERVAL_DELETE, 'pusId', 'intervals');
export const resetKnownPus = simple(types.RESET_KNOWN_PUS, 'interval');
