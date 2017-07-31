import * as types from '../../../types';
import { getView } from '../../../reducers/views';
import { getWindowIdByViewId } from '../../../selectors/windows';
import { withOpenDialog } from '../helpers';

const onSaveView = documentManager => withOpenDialog(
  ({ getState, dispatch, openDialog }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW) {
      const { viewId } = action.payload;
      const state = getState();
      const view = getView(state, { viewId });
      const windowId = getWindowIdByViewId(state, { viewId });
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
    return nextAction;
  }
);

export default onSaveView;