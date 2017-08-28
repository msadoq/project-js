import _set from 'lodash/fp/set';
import { compare } from 'fast-json-patch';
import {
  REDUX_SYNCHRONIZATION_PATCH_KEY,
  TIMING_DATA,
  TIMING_MILESTONES,
} from '../../../constants';

const executionMonitor = require('../../../common/logManager/execution');



const createPatch = (sendDown, identity, log, isDebugOn) => ({ getState }) => next => (action) => {
  const execution = executionMonitor('middleware:patchGenerator');
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
  execution.start('patchGeneration');
  const patch = compare(prevState, newState);
  execution.stop('patchGeneration');
  patchAction = _set(['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], patch, patchAction);
  if (log) {
    log.silly('patch forwarded to main process', action.type);
  }
  sendDown(patchAction);
  execution.print();
  return result;
};

export default createPatch;
