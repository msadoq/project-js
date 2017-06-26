import _set from 'lodash/fp/set';
import getLogger from '../../../common/logManager';
import { getStore } from '../../store';
import { renderer } from '../../ipc';
import { TIMING_DATA, TIMING_MILESTONES } from '../../../constants';

const log = getLogger('main:controllers:server:onReduxPatch');

export default function onReduxPatch(patchAction) {
  let action = patchAction;
  try { // TODO dbrugne remove try/catch once lifecycle is stable
    const timingBegin = process.hrtime();
    getStore().dispatch(patchAction);
    const timingEnd = process.hrtime();
    action = _set(['meta', TIMING_DATA, TIMING_MILESTONES.BEFORE_MAIN_STORE_UPDATE], timingBegin, patchAction);
    action = _set(['meta', TIMING_DATA, TIMING_MILESTONES.AFTER_MAIN_STORE_UPDATE], timingEnd, action);
  } catch (e) {
    log.debug(e);
  }
  renderer.sendReduxPatch(action);
}
