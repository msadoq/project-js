import rtd from 'rtd/catalogs';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/mainStore';
import getTelemetryStaticElements from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import { resizeExplorer, focusTabInExplorer } from '../../../store/actions/pages';
import { getPanels } from '../../../store/reducers/pages';
import {
  updateInspectorRemoteId,
  updateInspectorDataId,
  isInspectorDisplayingTM,
  setInspectorStaticData,
  isInspectorStaticDataLoading,
} from '../../../store/actions/inspector';
import { getInspectorRemoteId } from '../../../store/selectors/inspector';

const logger = getLogger('main:controllers:renderer:onOpenInspector');

export default function ({ pageId, remoteId, dataId }) {
  const { getState, dispatch } = getStore();
  const { parameterName, catalog, sessionId, domainId } = dataId;

  const panels = getPanels(getState(), { pageId });
  const size = 350; // Default explorer size
  if (!panels || panels.explorerWidth === 0) {
    dispatch(resizeExplorer(pageId, size));
  }
  dispatch(focusTabInExplorer(pageId, 'inspector'));

  if (getInspectorRemoteId(getState()) === remoteId) {
    return;
  }
  dispatch(setInspectorStaticData(null));
  dispatch(isInspectorDisplayingTM(false));
  dispatch(updateInspectorRemoteId(remoteId));
  dispatch(updateInspectorDataId(dataId));

  if (catalog !== 'Reporting') {
    return;
  }
  dispatch(isInspectorStaticDataLoading(true));
  dispatch(isInspectorDisplayingTM(true));

  logger.info(`request ${parameterName} for session ${sessionId} and domain ${domainId}`);
  const socket = parameters.get('RTD_UNIX_SOCKET'); // TODO way to deal with that ?
  rtd.connect(socket, (cErr, isConnected) => {
    if (cErr || !isConnected) {
      dispatch(isInspectorStaticDataLoading(false));
      dispatch(updateInspectorRemoteId(null));
      dispatch(add('global', 'danger', 'Cannot connect to RTD'));
      return;
    }

    getTelemetryStaticElements({ rtd, sessionId, domainId }, parameterName, (err, data) => {
      if (err || !data) {
        dispatch(isInspectorStaticDataLoading(false));
        dispatch(updateInspectorRemoteId(null));
        dispatch(add(
          'global',
          'warning',
          `Parameter ${parameterName} was not found in catalog Reporting for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }
      const staticData = prepareDataToTree(data, { noRoot: true });
      dispatch(setInspectorStaticData(staticData));
      dispatch(isInspectorStaticDataLoading(false));
    });
  });
}
