import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const viewsNeedRange = simple(types.VIEWS_NEED_RANGE, 'neededRangeData');
export const viewsNeedLast = simple(types.VIEWS_NEED_LAST, 'neededLastData');
