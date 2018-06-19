import _ from 'lodash/fp';

const cleanCache = lokiGenericManager => () => next => (action) => {
  if (action.type === 'DEBUG_SAVE_CACHE') {
    return next(_.set('payload', lokiGenericManager.getDb().collections, action));
  }
  return next(action);
};

export default cleanCache;
