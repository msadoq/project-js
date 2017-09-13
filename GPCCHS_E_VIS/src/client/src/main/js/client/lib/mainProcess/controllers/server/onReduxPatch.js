import { getStore } from '../../store';
import { renderer } from '../../ipc';

export default function onReduxPatch(patchActionQueue) {
  const { queue } = patchActionQueue;
  const { dispatch } = getStore();

  const decoratedActions = queue.map(action => dispatch(action));

  renderer.sendReduxPatch({ queue: decoratedActions });
}
