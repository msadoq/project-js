// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData
//  middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Implements prepare LAst middleware and its test
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : update unit tests . .
// VERSION : 1.1.2 : FA : #7578 : 23/08/2017 : Add throttle mechanism to pubSubController
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : DM : #7111 : 25/09/2017 : Add current in history view data
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : DM : #5806 : 12/10/2017 : Create AlarmPubSubController and include it in the
//  code
// END-HISTORY
// ====================================================================

import * as types from '../types';
import simple from '../helpers/simpleActionCreator';

// Actions dispatched from archiveController to the prepareData middlewares
export const incomingLast = simple(types.INCOMING_LAST_DATA, 'tbdId', 'peers', 'dataId');
export const incomingRange = simple(types.INCOMING_RANGE_DATA, 'tbdId', 'peers', 'dataId', 'samplingNumber');
export const incomingObsoleteEvent = simple(types.INCOMING_OBSOLETE_EVENT, 'tbdId', 'peers', 'dataId');
export const incomingPubSub = simple(types.INCOMING_PUBSUB_DATA, 'data');
export const incomingPubSubAlarm = simple(types.INCOMING_PUBSUBALARM_DATA, 'data');

// Action dispatch by the prepareData middlewares
export const newData = simple(types.NEW_DATA, 'data');

export const injectDataRange = simple(types.INJECT_DATA_RANGE, 'oldViewMap', 'newViewMap',
  'oldExpectedRangeIntervals', 'newExpectedRangeIntervals', 'dataToInject',
  'configurations', 'visuWindow'); // for historyView
export const injectDataLast = simple(types.INJECT_DATA_LAST, 'oldViewMap', 'newViewMap',
  'oldExpectedLastIntervals', 'newExpectedLastIntervals', 'dataToInject');
export const injectDataObsoleteEvent = simple(types.INJECT_DATA_OBSOLETE_EVENT, 'dataToInject', 'newViewMap', 'globalState');
