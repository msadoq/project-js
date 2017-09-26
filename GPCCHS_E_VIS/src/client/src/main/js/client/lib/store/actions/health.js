// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Add delay in second parameters of updateHealth thunk
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/health . . .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// END-HISTORY
// ====================================================================

// import _throttle from 'lodash/throttle';
// import _memoize from 'lodash/memoize';
import simple from '../helpers/simpleActionCreator';
import * as types from '../types';
/* import {
  getDcStatus,
  getHssStatus,
  getLastPubSubTimestamp,
} from '../reducers/health'; */

export const updateDcStatus = simple(types.HSS_UPDATE_DC_STATUS, 'status');
export const updateHssStatus = simple(types.HSS_UPDATE_HEALTH_STATUS, 'status');
export const updateMainStatus = simple(types.HSS_UPDATE_MAIN_STATUS, 'status');
export const updateWindowStatus = simple(types.HSS_UPDATE_WINDOW_STATUS, 'windowId', 'status');
export const updateLastPubSubTimestamp = simple(types.HSS_UPDATE_LAST_PUBSUB_TIMESTAMP, 'timestamp');

export const updateStressProcess = simple(types.HSC_UPDATE_STRESS, 'process', 'isStressed');

// we need to memoize to keep throttling computed informations in memory
/* const updateLastPubSubTimestampThrottled = _memoize(delay => _throttle(
  (dispatch, timestamp) => dispatch(updateLastPubSubTimestamp(timestamp)),
  delay,
  { leading: true }
)); */
