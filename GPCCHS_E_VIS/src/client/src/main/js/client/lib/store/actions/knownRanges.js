import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// intervals can be a simple array for 1 interval or an array of arrays for multiple intervals
export const addKnownRanges = simple(types.WS_KNOWNINTERVAL_ADD, 'tbdId', 'intervals');
export const removeKnownRanges = simple(types.WS_KNOWNINTERVAL_DELETE, 'tbdId', 'intervals');
