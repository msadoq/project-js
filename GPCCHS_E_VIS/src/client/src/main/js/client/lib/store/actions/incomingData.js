import * as types from '../types';
import simple from '../helpers/simpleActionCreator';

// Actions dispatched from archiveController to the prepareData middlewares
export const incomingLast = simple(types.INCOMING_LAST_DATA, 'tbdId', 'peers', 'dataId');
export const incomingRange = simple(types.INCOMING_RANGE_DATA, 'tbdId', 'peers', 'dataId');
export const incomingPubSub = simple(types.INCOMING_PUBSUB_DATA, 'dataId', 'peers');

// Action dispatch by the prepareData middlewares
export const newData = simple(types.NEW_DATA, 'data');

export const injectDataRange = simple(types.INJECT_DATA_RANGE, 'oldViewMap', 'newViewMap',
  'oldExpectedRangeIntervals', 'newExpectedRangeIntervals', 'dataToInject');
export const injectDataLast = simple(types.INJECT_DATA_LAST, 'oldViewMap', 'newViewMap',
  'oldExpectedLastIntervals', 'newExpectedLastIntervals', 'dataToInject');
