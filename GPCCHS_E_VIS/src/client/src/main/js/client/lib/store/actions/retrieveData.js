// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// END-HISTORY
// ====================================================================

import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const viewsNeedRange = simple(types.VIEWS_NEED_RANGE, 'neededRangeData');
export const viewsNeedLast = simple(types.VIEWS_NEED_LAST, 'neededLastData');
