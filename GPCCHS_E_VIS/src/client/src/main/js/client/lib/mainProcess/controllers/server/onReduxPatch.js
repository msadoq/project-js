import { getStore } from '../../store';
import { renderer } from '../../ipc';

export default function onReduxPatch(patchAction) {
  getStore().dispatch(patchAction);
  renderer.sendReduxPatch(patchAction);
}
