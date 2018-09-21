// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Move inspector middleware in a folder
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Implement open inspector for a specific gma
//  parameter
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

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
  if (action.type === types.HSC_ASK_OPEN_INSPECTOR) {
    const {
      pageId, viewId, type: viewType,
      options: { epName, epId, dataId, field },
    } = action.payload;
    const {
      domainId,
      sessionId,
      parameterName: catalogItemName,
    } = dataId;

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

    logger.info(`request ${catalogItemName} for session ${sessionId} and domain ${domainId}`);

    rtdManager.getTelemetryStaticElements({ sessionId, domainId }, catalogItemName, (err, data) => {
      if (err || !data) {
        dispatch(isInspectorStaticDataLoading(false));
        dispatch(deleteInspectorGeneralData());
        dispatch(add(
          'global',
          'warning',
          `Parameter ${catalogItemName} was not found in catalog Reporting for session ${sessionId} and domain ${domainId}`
        ));
        return;
      }
      const staticData = rtdManager.prepareDataToTree(data);
      dispatch(setInspectorStaticData(staticData));
    });
  }
  return next(action);
};
