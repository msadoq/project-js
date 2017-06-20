import getLogger from '../../../common/logManager';
import { getStore } from '../../store';
import { renderer } from '../../ipc';

const log = getLogger('main:controllers:server:onReduxPatch');

export default function onReduxPatch(patchAction) {
  try { // TODO dbrugne remove try/catch once lifecycle is stable
    getStore().dispatch(patchAction);
  } catch (e) {
    log.debug(e);
  }
  renderer.sendReduxPatch(patchAction);
}
