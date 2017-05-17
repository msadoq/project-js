import getLogger from 'common/log';
import { updateWindowStatus } from '../../../store/actions/health';
import { getStore } from '../../../store/isomorphic';

const logger = getLogger('main:controllers:renderer:onHealthStatus');

export default function ({ windowId, status }) {
  logger.info(`${windowId} send its new health status message: ${status}`);
  getStore().dispatch(updateWindowStatus(windowId, status));
}
