import simple from '../../store/helpers/simpleActionCreator';
import * as types from '../../store/types';

export const incomingArchive = simple(types.DATA_INCOMING_ARCHIVE, 'remoteId', 'data');
export const incomingPubSub = simple(types.DATA_INCOMING_PUBSUB, 'remoteId', 'data');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);

export const updateViewData = simple(
  types.DATA_UPDATE_VIEWDATA,
  'oldViewMap',
  'newViewMap',
  'oldExpectedIntervals',
  'newExpectedIntervals',
  'dataToInject'
);
