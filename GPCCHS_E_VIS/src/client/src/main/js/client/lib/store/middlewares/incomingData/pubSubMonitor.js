import * as types from 'store/types';
import executionMonitor from 'common/logManager/execution';
import { updateLastPubSubTimestamp } from 'store/actions/health';

const pubSubMonitor = (timing) => {
  let timeoutPubSub;

  const resetTimeout = (dispatch) => {
    clearTimeout(timeoutPubSub);
    timeoutPubSub = setTimeout(() => {
      dispatch(updateLastPubSubTimestamp(undefined));
    }, timing);
  };

  return ({ dispatch }) => next => (action) => {
    const nextAction = next(action);
    if (action.type !== types.INCOMING_PUBSUB_DATA
      && action.type !== types.INCOMING_PUBSUBALARM_DATA
    ) {
      return nextAction;
    }

    const execution = executionMonitor('middleware:pubSubMonitor');
    execution.start('global');
    resetTimeout(dispatch);
    dispatch(updateLastPubSubTimestamp(Date.now()));
    execution.stop('global');
    execution.print();
    return nextAction;
  };
};

export default pubSubMonitor;
