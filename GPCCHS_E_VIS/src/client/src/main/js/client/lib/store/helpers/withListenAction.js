import _ from 'lodash/fp';

/*
** a higher order middleware to listen chained actions inside your middleware
** Check examples on documents middleware
**/
const withListenAction = middleware => storeApi => (next) => {
  const observers = {};
  const listenAction = (type, observer = _.noop) => {
    observers[type] = observer;
  };
  const configuredMiddleware = middleware({ ...storeApi, listenAction })(next);
  return (action) => {
    const nextAction = configuredMiddleware(action);
    if (observers[action.type]) {
      observers[action.type](action);
      observers[action.type] = undefined;
    }
    return nextAction;
  };
};

export default withListenAction;
