// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : Add middleware to apply pause on master overload
// VERSION : 1.1.2 : DM : #6127 : 14/09/2017 : Add warning message when autopause the timebar because process is overloaded
// END-HISTORY
// ====================================================================

import * as types from '../../types';
import { pause } from '../../actions/hsc';
import { add as addMessage } from '../../actions/messages';
/**
 * Middleware to apply pause on master overload
 */
const onProcessOverload = () => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSS_UPDATE_HEALTH_STATUS) {
    if (action.payload.status === 'CRITICAL') {
      dispatch(pause());
      dispatch(addMessage('global', 'warning', 'Process overloaded : pause the timebar'));
    }
  }
  return nextAction;
};

export default onProcessOverload;
