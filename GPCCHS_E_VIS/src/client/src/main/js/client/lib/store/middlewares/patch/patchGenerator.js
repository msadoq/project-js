import _set from 'lodash/fp/set';
import { compare } from 'fast-json-patch';
import {
  REDUX_SYNCHRONIZATION_PATCH_KEY,
  TIMING_DATA,
  TIMING_MILESTONES,
} from '../../../constants';

const createPatch = (sendDown, identity, log, isDebugOn) => ({ getState }) => next => (action) => {

  if (log) {
    log.silly('Master action dispatched : ', action.type);
  }

  const prevState = getState();
  const timingBegin = process.hrtime();
  const result = next(action);
  const timingEnd = process.hrtime();
  const newState = getState();

  let patchAction = action;
  patchAction = _set(['meta', 'origin'], identity, patchAction);
  if (isDebugOn) {
    patchAction = _set(['meta', TIMING_DATA, TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE], timingBegin, patchAction);
    patchAction = _set(['meta', TIMING_DATA, TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE], timingEnd, patchAction);
  }
  const patch = compare(prevState, newState);
  console.log('patch length: ',action.type, patch.length);
  patchAction = _set(['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], patch, patchAction);
  if (log) {
    log.silly('patch forwarded to main process', action.type);
  }
  sendDown(patchAction);
  return result;
};

export default createPatch;
