import _ from 'lodash/fp';

const cleanCache = lokiManager => () => next => (action) => {
  if (action.type === 'DEBUG_SAVE_CACHE') {
    return next(_.set('payload', lokiManager.getDb().collections, action));
  }
  return next(action);
};

export default cleanCache;
