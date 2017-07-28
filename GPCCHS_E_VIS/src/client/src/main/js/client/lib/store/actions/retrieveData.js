import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const viewsNeedRange = simple(types.WS_RETRIEVEDATA_RANGE, 'neededRangeData');
export const viewsNeedLast = simple(types.WS_RETRIEVEDATA_LAST, 'neededLastData');
