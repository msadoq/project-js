import executionMonitor from 'common/log/execution';
import always from 'lodash/fp/always';
import has from 'lodash/fp/has';
import getOr from 'lodash/fp/getOr';

const hasProfiling = has('meta.profiling');
const getProfiling = getOr({}, 'meta.profiling');

// you can use withProfiling higher order action creator to use execution profiling on the store
const profilingMiddleware = ({ getState }) => next => (action) => {
  const { predicate = always(true), namespace, key, msg } = getProfiling(action);
  if (!hasProfiling(action) || !predicate(getState(), action)) {
    return next(action);
  }
  const execution = executionMonitor(namespace);

  execution.start(key); // start profiling
  const returnedAction = next(action); // action pass in reducer
  execution.stop(key, msg); // stop profiling
  execution.print();

  return returnedAction;
};

export default profilingMiddleware;
