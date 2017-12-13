// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : CReation of knownRanges reducer and actions
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : Update of knownRanges reducer and actions
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// END-HISTORY
// ====================================================================

import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// intervals can be a simple array for 1 interval or an array of arrays for multiple intervals
export const sendArchiveQuery =
  simple(types.WS_KNOWNINTERVAL_ADD, 'tbdId', 'dataId', 'intervals', 'filters');
export const removeKnownRanges = simple(types.WS_KNOWNINTERVAL_DELETE, 'tbdId', 'intervals');
export const resetKnownRange = simple(types.RESET_KNOWN_RANGES, 'tbdIdInterval');
