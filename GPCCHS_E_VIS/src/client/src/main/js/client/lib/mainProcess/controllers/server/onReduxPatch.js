import { getStore } from 'mainProcess/store';
import { renderer } from 'mainProcess/ipc';

export default function onReduxPatch(patchActionQueue) {
  const { queue } = patchActionQueue;
  const { dispatch } = getStore();

  const decoratedActions = queue.map(action => dispatch(action));

  renderer.sendReduxPatch({ queue: decoratedActions });
}
