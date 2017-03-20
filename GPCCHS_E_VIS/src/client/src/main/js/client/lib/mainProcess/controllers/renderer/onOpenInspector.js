import rtd from 'rtd/catalogs';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import getTelemetryStaticElements from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import { resizeExplorer, focusTabInExplorer } from '../../../store/actions/pages';
import { getPanels } from '../../../store/selectors/pages';
import {
  isInspectorStaticDataNodeLoading,
  updateInspectorDataId,
  updateInspectorSessionId,
  updateInspectorDomainId,
  updateInspectorStaticDataNode,
  isInspectorStaticDataNodeToggled,
} from '../../../store/actions/inspector';
import { getInspectorDataId } from '../../../store/selectors/inspector';

const logger = getLogger('main:controllers:renderer:onOpenInspector');

const createDataId = (parameterName, sessionId, domainId) => `${parameterName}:${sessionId}:${domainId}`;

export default function ({ pageId, parameterName, sessionId, domainId }) {
  const { getState, dispatch } = getStore();
  logger.info(`request ${parameterName} for session ${sessionId} and domain ${domainId}`);

  const panels = getPanels(getState(), { pageId });
  const size = 350; // Default explorer size
  if (!panels || panels.explorerWidth === 0) {
    dispatch(resizeExplorer(pageId, size));
  }
  dispatch(focusTabInExplorer(pageId, 'inspector'));

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
    dispatch(updateInspectorStaticDataNode(
      [], prepareDataToTree(null, { rootName: parameterName })));
    dispatch(isInspectorStaticDataNodeLoading([], true));
    dispatch(isInspectorStaticDataNodeToggled([], true));

    getTelemetryStaticElements({ rtd, sessionId, domainId }, parameterName, (err, data) => {
      if (err || !data) {
        dispatch(isInspectorStaticDataNodeLoading([], false));
        dispatch(updateInspectorDataId(null));
        dispatch(add(
          'global',
          'warning',
          `Parameter ${parameterName} was not found in catalog Reporting for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }
      const staticData = prepareDataToTree(data, { rootName: parameterName });
      dispatch(updateInspectorSessionId(sessionId));
      dispatch(updateInspectorDomainId(domainId));
      dispatch(updateInspectorStaticDataNode([], staticData));
      dispatch(isInspectorStaticDataNodeLoading([], false));
    });
  });
}
