import constant from 'lodash/fp/constant';
import isFunction from 'lodash/fp/isFunction';

// higher order action creator to set meta.profiling
// should be used with profiling middleware
const withProfiling = (msg, actionCreator, options = {}) => (...args) => {
  const action = actionCreator(...args);
  const {
    predicate = constant(true),
    namespace = action.type,
    key = 'global',
  } = options;

  return {
    ...action,
    meta: {
      ...action.meta,
      profiling: {
        predicate,
        namespace,
        key,
        msg: isFunction(msg) ? msg(action) : msg,
      },
    },
  };
};

export default withProfiling;
