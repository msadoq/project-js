// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure + cleaning
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 12/07/2017 : Add incomingData middleware that throttle data sending to reducers
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json patch
// END-HISTORY
// ====================================================================

import simple from '../../store/helpers/simpleActionCreator';
import * as types from '../../store/types';

export const incomingArchive = simple(types.DATA_INCOMING_ARCHIVE, 'remoteId', 'data');
export const incomingPubSub = simple(types.DATA_INCOMING_PUBSUB, 'remoteId', 'data');
export const removeAllData = simple(types.DATA_REMOVE_ALL_VIEWDATA);
