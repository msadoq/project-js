import { v4 } from 'node-uuid';
import times from 'lodash/fp/times';
import get from 'lodash/fp/prop';

const createUuids = times(v4);

// action creator enhancer that add meta.uuids array in the action
const addUuids = (actionCreator, nb = 1) => (...args) => {
  const action = actionCreator(...args);
  const getNbEntrypoints = get('payload.configuration.entryPoints.length');
  return {
    ...action,
    meta: {
      ...action.meta,
      uuids: createUuids(getNbEntrypoints(action) || nb),
    },
  };
};

export default addUuids;
