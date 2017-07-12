import * as types from '../../../types';
import { getView } from '../../../reducers/views';
import { getFocusedWindow } from '../../../selectors/windows';

const onSaveView = documentManager => (
  ({ getState, dispatch, openDialog }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW) {
      const { viewId } = action.payload;
      const state = getState();
      const view = getView(state, { viewId });
      const window = getFocusedWindow(getState());
      const windowId = window.uuid;
      const saveAs = action.payload.saveAs || (!view.oId && !view.absolutePath);
      if (saveAs) {
        openDialog(windowId, 'save', {}, (closeAction) => {
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
    return returnedAction;
  }
);

export default onSaveView;
