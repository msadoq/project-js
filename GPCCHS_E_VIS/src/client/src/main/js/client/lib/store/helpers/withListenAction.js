import _ from 'lodash/fp';

/*
** a higher order middleware to listen chained actions inside your middleware
** Check examples on documents middleware
**/
const withListenAction = middleware => storeApi => (next) => {
  const observers = {};
  const listenAction = (type, observer = _.noop) => {
    if (observers[type]) {
      observers[type] = [...observers[type], observer];
    } else {
      observers[type] = [observer];
    }
  };
  const configuredMiddleware = middleware({ ...storeApi, listenAction })(next);
  return (action) => {
    const nextAction = configuredMiddleware(action);
    if (_.isArray(observers[action.type])) {
      _.each((observer) => {
        observers[action.type] = _.reject(_.equals(observer), observers[action.type]);
        observer(action);
      }, observers[action.type]);
    }
    return nextAction;
  };
};

export default withListenAction;
