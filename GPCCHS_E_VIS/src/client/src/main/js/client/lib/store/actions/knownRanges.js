import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// intervals can be a simple array for 1 interval or an array of arrays for multiple intervals
export const sendArchiveQuery =
  simple(types.WS_KNOWNINTERVAL_ADD, 'tbdId', 'dataId', 'intervals', 'filters');
export const removeKnownRanges = simple(types.WS_KNOWNINTERVAL_DELETE, 'tbdId', 'intervals');
export const resetKnownRange = simple(types.RESET_KNOWN_RANGES, 'tbdIdInterval');
