import * as types from '../../types';
import { pause } from '../../actions/hsc';
import { getIsPlaying } from '../../reducers/hsc';
import { add as addMessage } from '../../actions/messages';
/**
 * Middleware to apply pause on master overload
 */
const onProcessOverload = () => ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSS_UPDATE_HEALTH_STATUS) {
    const isPlaying = getIsPlaying(getState());
    if (isPlaying && action.payload.status === 'CRITICAL') {
      dispatch(pause());
      dispatch(addMessage('global', 'warning', 'Process overloaded : pause the timebar'));
    }
  }
  return nextAction;
};

export default onProcessOverload;
