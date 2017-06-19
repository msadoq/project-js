import { getStore } from '../../store';

/**
 * Triggered when main process sends a Redux action to server process
 *
 * - forward to server process
 *
 * @param action
 */
module.exports = action => getStore().dispatch(action);
