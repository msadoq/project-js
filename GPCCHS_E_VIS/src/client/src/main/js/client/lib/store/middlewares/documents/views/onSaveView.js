import * as types from 'store/types';

import { getView } from 'store/reducers/views';
import { getWindowIdByViewId } from 'store/selectors/windows';

import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnSaveView = documentManager => withListenAction(
  ({ getState, dispatch, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW) {
      const { viewId } = action.payload;
      const state = getState();
      const view = getView(state, { viewId });
      const windowId = getWindowIdByViewId(state, { viewId });
      const saveAs = action.payload.saveAs || (!view.oId && !view.absolutePath);
      if (saveAs) {
        dispatch(openDialog(windowId, 'save', {
          filters: getSaveExtensionsFilters(view.type),
          defaultPath: getDefaultFolder(state),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            const absolutePath = choice;
            dispatch(documentManager.saveView(viewId, absolutePath));
          }
        });
      } else {
        dispatch(documentManager.saveView(viewId, view.absolutePath));
      }
    }
    return nextAction;
  }
);

export default makeOnSaveView;
