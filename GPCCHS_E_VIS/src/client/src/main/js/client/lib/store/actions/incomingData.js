// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Implements prepare LAst middleware and its test
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : update unit tests . .
// VERSION : 1.1.2 : FA : #7578 : 23/08/2017 : Add throttle mechanism to pubSubController
// END-HISTORY
// ====================================================================

import * as types from '../types';
import simple from '../helpers/simpleActionCreator';

// Actions dispatched from archiveController to the prepareData middlewares
export const incomingLast = simple(types.INCOMING_LAST_DATA, 'tbdId', 'peers', 'dataId');
export const incomingRange = simple(types.INCOMING_RANGE_DATA, 'tbdId', 'peers', 'dataId');
export const incomingPubSub = simple(types.INCOMING_PUBSUB_DATA, 'data');

// Action dispatch by the prepareData middlewares
export const newData = simple(types.NEW_DATA, 'data');

export const injectDataRange = simple(types.INJECT_DATA_RANGE, 'oldViewMap', 'newViewMap',
  'oldExpectedRangeIntervals', 'newExpectedRangeIntervals', 'dataToInject');
export const injectDataLast = simple(types.INJECT_DATA_LAST, 'oldViewMap', 'newViewMap',
  'oldExpectedLastIntervals', 'newExpectedLastIntervals', 'dataToInject');
