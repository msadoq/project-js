import { getStore } from '../../store';
import { renderer } from '../../ipc';

export default function onReduxPatch(patchActionQueue) {
  const { queue } = patchActionQueue;
  for (let i = 0; i < queue.length; i += 1 ) {
    getStore().dispatch(queue[i]);
  }
  renderer.sendReduxPatch(patchActionQueue);
}
