import * as types from 'store/types';

import { getView } from 'store/reducers/views';
import { getWindowIdByViewId } from 'store/selectors/windows';

import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnSaveViewAsModel = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW_AS_MODEL) {
      const { viewId } = action.payload;
      const state = getState();
      const view = getView(state, { viewId });
      const windowId = getWindowIdByViewId(state, { viewId });
      dispatch(openDialog(windowId, 'save', {
        filters: getSaveExtensionsFilters(view.type),
        defaultPath: getDefaultFolder(state),
      }));
      listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
        if (closeAction.payload.choice) {
          const absolutePath = closeAction.payload.choice;
          dispatch(documentManager.saveViewAsModel(viewId, absolutePath));
        }
      });
    }
    return nextAction;
  }
);

export default makeOnSaveViewAsModel;
