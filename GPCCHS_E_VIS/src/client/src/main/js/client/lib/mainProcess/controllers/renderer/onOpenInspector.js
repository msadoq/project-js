import rtd from 'rtd/catalogs';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import getTelemetryStaticElements from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import { displayExplorer, currentExplorer } from '../../../store/actions/windows';
import {
  isInspectorStaticDataLoading,
  updateInspectorDataId,
  updateInspectorStaticData,
  isInspectorStaticDataNodeToggled,
} from '../../../store/actions/inspector';
import { getInspectorDataId } from '../../../store/selectors/inspector';

const logger = getLogger('main:controllers:renderer:onOpenInspector');

const createDataId = (parameterName, sessionId, domainId) => `${parameterName}:${sessionId}:${domainId}`;

export default function ({ windowId, parameterName, sessionId, domainId }) {
  const { getState, dispatch } = getStore();
  logger.info(`request ${parameterName} for session ${sessionId} and domain ${domainId}`);

  dispatch(displayExplorer(windowId, true));
  dispatch(currentExplorer(windowId, 'inspector'));

  const dataId = createDataId(parameterName, sessionId, domainId);
  if (getInspectorDataId(getState()) === dataId) {
    return;
  }

  dispatch(updateInspectorDataId(dataId));

  const socket = parameters.get('RTD_UNIX_SOCKET'); // TODO way to deal with that ?
  rtd.connect(socket, (cErr, isConnected) => {
    if (cErr || !isConnected) {
      dispatch(updateInspectorDataId(null));
      dispatch(add('global', 'danger', 'Cannot connect to RTD'));
      return;
    }
    dispatch(updateInspectorStaticData({ name: parameterName }));
    dispatch(isInspectorStaticDataLoading(true));

    getTelemetryStaticElements({ rtd, sessionId, domainId }, parameterName, (err, data) => {
      dispatch(isInspectorStaticDataLoading(false));
      if (err || !data) {
        dispatch(updateInspectorDataId(null));
        dispatch(add(
          'global',
          'warning',
          `Parameter ${parameterName} was not found in catalog Reporting for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }

      dispatch(updateInspectorStaticData(prepareDataToTree(data, parameterName)));
      dispatch(isInspectorStaticDataNodeToggled([], true));
    });
  });
}
