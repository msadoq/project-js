import * as types from '../types';
import simple from '../helpers/simpleActionCreator';

// Actions dispatched from archiveController to the prepareData middlewares
export const incomingLast = simple(types.INCOMING_LAST_DATA, 'tbdId', 'peers');
export const incomingRange = simple(types.INCOMING_RANGE_DATA, 'tbdId', 'peers');
export const incomingPubSub = simple(types.INCOMING_PUBSUB_DATA, 'dataId', 'peers');

// Action dispatch by the prepareData middlewares
export const injectNewData = simple(types.INJECT_NEW_DATA, 'tbdId', 'data');
