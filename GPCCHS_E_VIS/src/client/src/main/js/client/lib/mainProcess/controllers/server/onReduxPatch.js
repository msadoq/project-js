import getLogger from '../../../common/logManager';
import { getStore } from '../../store';
import { renderer } from '../../ipc';

const log = getLogger('main:controllers:server:onReduxPatch');

export default function onReduxPatch(patchAction) {
  let actionDecorated = patchAction;
  try { // TODO dbrugne remove try/catch once lifecycle is stable
    actionDecorated = getStore().dispatch(patchAction);
  } catch (e) {
    log.debug(e);
  }
  renderer.sendReduxPatch(actionDecorated);
}
