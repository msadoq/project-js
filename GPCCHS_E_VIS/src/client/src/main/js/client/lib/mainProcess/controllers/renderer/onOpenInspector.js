import rtd from 'rtd/catalogs';
import getLogger from 'common/log';
import parameters from 'common/parameters';
import { getStore } from '../../../store/isomorphic';
import getTelemetryStaticElements from '../../../rtdManager';
import prepareDataToTree from '../../../rtdManager/prepareDataToTree';
import { add } from '../../../store/actions/messages';
import { minimizeExplorer, focusTabInExplorer } from '../../../store/actions/pages';
import {
  setInspectorGeneralData,
  deleteInspectorGeneralData,
  isInspectorDisplayingTM,
  setInspectorStaticData,
  isInspectorStaticDataLoading,
} from '../../../store/actions/inspector';
import { getInspectorEpId } from '../../../store/reducers/inspector';

const logger = getLogger('main:controllers:renderer:onOpenInspector');

export default function ({ pageId, viewId, viewType, epName, epId, dataId, field }) {
  const { getState, dispatch } = getStore();
  const { parameterName, catalog, sessionId, domainId } = dataId;

  dispatch(minimizeExplorer(pageId, false));
  dispatch(focusTabInExplorer(pageId, 'inspector'));

  if (getInspectorEpId(getState()) === epId) {
    return;
  }
  dispatch(setInspectorStaticData(null));
  dispatch(setInspectorGeneralData(viewId, viewType, epId, epName, dataId, field));

  if (catalog !== 'Reporting') {
    return;
  }
  dispatch(isInspectorStaticDataLoading(true));
  dispatch(isInspectorDisplayingTM(true));

  logger.info(`request ${parameterName} for session ${sessionId} and domain ${domainId}`);
  const socket = parameters.get('RTD_UNIX_SOCKET'); // TODO way to deal with that ?
  if (!socket) {
    dispatch(isInspectorStaticDataLoading(false));
    dispatch(deleteInspectorGeneralData());
    dispatch(add('global', 'danger', 'No unix socket defined for the RTD'));
    return;
  }
  rtd.connect(socket, (cErr, isConnected) => {
    if (cErr || !isConnected) {
      dispatch(isInspectorStaticDataLoading(false));
      dispatch(deleteInspectorGeneralData());
      dispatch(add('global', 'danger', 'Cannot connect to RTD'));
      return;
    }

    getTelemetryStaticElements({ rtd, sessionId, domainId }, parameterName, (err, data) => {
      if (err || !data) {
        dispatch(isInspectorStaticDataLoading(false));
        dispatch(deleteInspectorGeneralData());
        dispatch(add(
          'global',
          'warning',
          `Parameter ${parameterName} was not found in catalog Reporting for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }
      const staticData = prepareDataToTree(data);
      dispatch(setInspectorStaticData(staticData));
    });
  });
}
