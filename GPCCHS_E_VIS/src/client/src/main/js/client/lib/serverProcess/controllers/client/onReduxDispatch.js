// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing info to meta action's
// END-HISTORY
// ====================================================================

import { getStore } from '../../store';

/**
 * Triggered when main process sends a Redux action to server process
 *
 * - forward to server process
 *
 * @param action
 */

module.exports = (action) => {
  getStore().dispatch(action);
};
