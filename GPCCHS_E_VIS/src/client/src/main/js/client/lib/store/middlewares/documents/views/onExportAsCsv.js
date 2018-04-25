// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================
import * as types from 'store/types';

import { getWindowIdByViewId } from 'store/selectors/windows';
import { openDialog } from 'store/actions/ui';
import { MIME_TYPES } from 'constants';
import withListenAction from 'store/helpers/withListenAction';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnExportAsCsv = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_EXPORT_AS_CSV) {
      const { viewId } = action.payload;
      const state = getState();
      const windowId = getWindowIdByViewId(state, { viewId });
      dispatch(openDialog(windowId, 'save', {
        filters: getSaveExtensionsFilters(MIME_TYPES.CommaSeparatedValues),
        defaultPath: getDefaultFolder(state),
      }));
      listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
        if (closeAction.payload.choice) {
          const absolutePath = closeAction.payload.choice;
          dispatch(documentManager.exportAsCsv(viewId, absolutePath));
        }
      });
    }
    return nextAction;
  }
);

export default makeOnExportAsCsv;
