import getLogger from 'common/logManager';
import * as types from 'store/types';
import { add } from 'store/actions/messages';
import { minimizeExplorer, focusTabInExplorer } from 'store/actions/pages';
import {
  setInspectorGeneralData,
  deleteInspectorGeneralData,
  isInspectorDisplayingTM,
  setInspectorStaticData,
  isInspectorStaticDataLoading,
} from 'store/actions/inspector';

const logger = getLogger('server:store:middlewares:inspector');

export default rtdManager => ({ dispatch }) => next => (action) => {
  const nextAction = next(action);
  if (action.type === types.HSC_ASK_OPEN_INSPECTOR) {
    const {
      pageId, viewId, type: viewType,
      options: { epName, epId, dataId, field },
    } = action.payload;
    const { parameterName, sessionId, domainId } = dataId;

    dispatch(minimizeExplorer(pageId, false));
    dispatch(focusTabInExplorer(pageId, 'inspector'));

    // if (getInspectorEpId(getState()) === epId) {
    //   return nextAction;
    // }
    dispatch(setInspectorStaticData(null));
    dispatch(setInspectorGeneralData(viewId, viewType, epId, epName, dataId, field));

    // if (catalog !== 'Reporting') {
    //   return nextAction;
    // }
    dispatch(isInspectorStaticDataLoading(true));
    dispatch(isInspectorDisplayingTM(true));

    logger.info(`request ${parameterName} for session ${sessionId} and domain ${domainId}`);

    rtdManager.getTelemetryStaticElements({ sessionId, domainId }, parameterName, (err, data) => {
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
      const staticData = rtdManager.prepareDataToTree(data);
      dispatch(setInspectorStaticData(staticData));
    });
  }
  return nextAction;
};
