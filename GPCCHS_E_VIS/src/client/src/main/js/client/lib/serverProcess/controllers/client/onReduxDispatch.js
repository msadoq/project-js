import _set from 'lodash/fp/set';
import { getStore } from '../../store';
import { TIMING_DATA, TIMING_MILESTONES } from '../../../constants';

/**
 * Triggered when main process sends a Redux action to server process
 *
 * - forward to server process
 *
 * @param action
 */

module.exports = (action) => {
  const actionWithTiming = _set(['meta', TIMING_DATA, TIMING_MILESTONES.MAIN_UP], process.hrtime(), action);
  getStore().dispatch(actionWithTiming);
};
