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

const makeOnExportAsImage = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    if (action.type === types.WS_ASK_EXPORT_AS_IMAGE) {
      const { viewId, imageData } = action.payload;
      const state = getState();
      const windowId = getWindowIdByViewId(state, { viewId });
      dispatch(openDialog(windowId, 'save', {
        filters: getSaveExtensionsFilters(MIME_TYPES.PortableNetworkGraphics),
        defaultPath: getDefaultFolder(state),
      }));
      listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
        if (closeAction.payload.choice) {
          const absolutePath = closeAction.payload.choice;
          dispatch(documentManager.exportAsImage(viewId, absolutePath, imageData));
        }
      });
    }
    return next(action);
  }
);

export default makeOnExportAsImage;
