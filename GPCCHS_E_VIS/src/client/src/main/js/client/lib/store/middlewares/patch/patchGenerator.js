// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add redux and patch workflow improvment + remove store observer
// VERSION : 1.1.2 : DM : #6700 : 28/08/2017 : Add some exectuion map + minor lint fix
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// VERSION : 1.1.2 : FA : #7813 : 19/09/2017 : Add batch action + logger support Remove ipc transmission for un-patch action
// END-HISTORY
// ====================================================================

import _set from 'lodash/fp/set';
import _ from 'lodash/fp';
import { compare } from 'fast-json-patch';
import {
  REDUX_SYNCHRONIZATION_PATCH_KEY,
  TIMING_DATA,
  TIMING_MILESTONES,
} from '../../../constants';

const executionMonitor = require('../../../common/logManager/execution');

const createPatch = (sendDown, identity, log, isDebugOn, timing) => {
  let queue = [];

  const throttledSendDown = _.throttle(timing, () => {
    const message = { queue };
    queue = [];
    sendDown(message);
  });

  return ({ getState }) => next => (action) => {
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
    if (patch.length !== 0) {
      queue.push(patchAction);
    } else {
      // TODO pgaucher add action minified ( light payload ) for un-patched action
    }
    throttledSendDown();
    execution.print();
    return result;
  };
};

export default createPatch;
