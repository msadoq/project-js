import _set from 'lodash/fp/set';
import { TIMING_DATA, TIMING_MILESTONES } from '../../../constants';

const { server } = require('../../ipc');

/**
 * Triggered when renderer process sends a Redux action to main process
 *
 * - forward to server process
 *
 * @param action
 */
module.exports = (action) => {
  const actionWithTiming = _set(['meta', TIMING_DATA, TIMING_MILESTONES.RENDERER_UP], process.hrtime(), action);
  server.sendReduxDispatch(actionWithTiming);
};
