// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================
import * as types from 'store/types';

import withListenAction from 'store/helpers/withListenAction';

const makeOnExportAsImageNot = documentManager => withListenAction(
  ({ dispatch }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_EXPORT_AS_IMAGE_NOT) {
      const { viewId, errorMessage } = action.payload;
      dispatch(documentManager.exportAsImageNot(viewId, errorMessage));
    }
    return nextAction;
  }
);

export default makeOnExportAsImageNot;
