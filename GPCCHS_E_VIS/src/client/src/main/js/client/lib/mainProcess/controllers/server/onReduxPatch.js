// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 20/06/2017 : Add robustness code until new lifecycle is stable
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing info to meta action's
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// VERSION : 1.1.2 : DM : #6700 : 13/09/2017 : Fix action main process timing addition
// END-HISTORY
// ====================================================================

import { getStore } from 'mainProcess/store';
import { renderer } from 'mainProcess/ipc';

export default function onReduxPatch(patchActionQueue) {
  const { queue } = patchActionQueue;
  const { dispatch } = getStore();

  const decoratedActions = queue.map(action => dispatch(action));

  renderer.sendReduxPatch({ queue: decoratedActions });
}
