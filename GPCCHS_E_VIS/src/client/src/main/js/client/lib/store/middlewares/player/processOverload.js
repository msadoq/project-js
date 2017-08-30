import * as types from '../../types';
import { pause } from '../../actions/hsc';
/**
 * Middleware to apply pause on master overload
 */
const onProcessOverload = () => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSS_UPDATE_HEALTH_STATUS) {
    if (action.payload.status === 'CRITICAL') {
      dispatch(pause());
    }
  }
  return nextAction;
};

export default onProcessOverload;
