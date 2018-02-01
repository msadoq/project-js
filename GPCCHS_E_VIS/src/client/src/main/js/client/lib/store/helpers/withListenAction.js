// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Add withListenAction middleware enhancer in store/helpers
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

/**
** a higher order middleware to listen chained actions inside your middleware
** Check examples on documents middleware
*/
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
