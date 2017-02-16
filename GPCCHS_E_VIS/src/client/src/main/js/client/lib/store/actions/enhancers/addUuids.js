import __ from 'lodash/fp';
import u from 'updeep';
import { v4 } from 'uuid';

const ifExist = u.if(__.identity);

// action creator enhancer that add random uuids in payload.entryPoints || payload.entryPoint
const addUuids = actionCreator => (...args) => {
  const action = actionCreator(...args);
  const nextPayload = u({
    configuration: ifExist({
      entryPoint: ifExist(__.update('id', v4)),
      entryPoints: ifExist(__.map(__.update('id', v4))),
    }),
  }, action.payload);
  return { ...action, payload: nextPayload };
};

export default addUuids;
