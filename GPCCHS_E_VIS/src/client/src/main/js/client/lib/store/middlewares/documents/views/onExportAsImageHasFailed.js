// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================
import * as types from 'store/types';

import withListenAction from 'store/helpers/withListenAction';

const makeOnExportAsImageHasFailed = documentManager => withListenAction(
  ({ dispatch }) => next => (action) => {
    if (action.type === types.WS_ASK_EXPORT_AS_IMAGE_HAS_FAILED) {
      const { viewId, errorMessage } = action.payload;
      dispatch(documentManager.exportAsImageHasFailed(viewId, errorMessage));
    }
    return next(action);
  }
);

export default makeOnExportAsImageHasFailed;
