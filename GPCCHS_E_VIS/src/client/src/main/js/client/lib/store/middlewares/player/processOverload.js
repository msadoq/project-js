// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : Add middleware to apply pause on master overload
// VERSION : 1.1.2 : DM : #6127 : 14/09/2017 : Add warning message when autopause the timebar
//  because process is overloaded
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { pause } from 'store/actions/hsc';
import { getIsPlaying } from 'store/reducers/hsc';
import { add as addMessage } from 'store/actions/messages';
/**
 * Middleware to apply pause on master overload
 */
const onProcessOverload = () => ({ dispatch, getState }) => next => (action) => {
  if (action.type === types.HSS_UPDATE_HEALTH_STATUS) {
    const isPlaying = getIsPlaying(getState());
    if (isPlaying && action.payload.status === 'CRITICAL') {
      dispatch(pause());
      dispatch(addMessage('global', 'warning', 'Process overloaded : pause the timebar'));
    }
  }
  return next(action);
};

export default onProcessOverload;
