import * as types from '../../types';

const preparePubSub = () => ({ dispatch }) => next => (action) => { // eslint-disable-line
  if (action.type === types.INCOMING_PUBSUB_DATA) {
    console.log('[PreparePubSubMiddleware] ON_INCOMING_PUBSUB_DATA action');
  }
  return next(action);
};

export default preparePubSub;
