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
