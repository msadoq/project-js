// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Move inspector middleware in a folder
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Implement open inspector for a specific gma
//  parameter
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { minimizeExplorer, focusTabInExplorer } from 'store/actions/pages';
import {
  setInspectorGeneralData,
  isInspectorDisplayingTM,
  setInspectorStaticData,
  isInspectorStaticDataLoading,
} from 'store/actions/inspector';


export default () => ({ dispatch }) => next => (action) => {
  if (action.type === types.HSC_ASK_OPEN_INSPECTOR) {
    const {
      pageId, viewId, type: viewType,
      options: { epName, epId, dataId, field },
    } = action.payload;

    dispatch(minimizeExplorer(pageId, false));
    dispatch(focusTabInExplorer(pageId, 'inspector'));

    dispatch(setInspectorStaticData(null));
    dispatch(setInspectorGeneralData(viewId, viewType, epId, epName, dataId, field));

    dispatch(isInspectorStaticDataLoading(true));
    dispatch(isInspectorDisplayingTM(true));
  }

  return next(action);
};
