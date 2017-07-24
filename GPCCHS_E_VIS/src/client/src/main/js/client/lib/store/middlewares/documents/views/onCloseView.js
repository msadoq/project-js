import * as types from '../../../types';
import { withOpenModal, withOpenDialog } from '../helpers';
import { getView, getViewIsModified } from '../../../reducers/views';
import { getWindowIdByViewId } from '../../../selectors/windows';
import { getPageIdByViewId } from '../../../reducers/pages';
import { closeView } from '../../../actions/views';
import { minimizeEditor } from '../../../actions/pages';

const closeEditor = pageId => minimizeEditor(pageId, true);

const makeOnCloseView = documentManager => withOpenDialog(withOpenModal(
  ({ dispatch, openModal, openDialog, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_CLOSE_VIEW) {
      const state = getState();
      const { viewId } = action.payload;
      const pageId = getPageIdByViewId(state, { viewId });
      const windowId = getWindowIdByViewId(state, { viewId });
      const view = getView(state, { viewId });

      const close = () => {
        dispatch(closeEditor(pageId));
        dispatch(closeView(viewId));
      };

      const saveAndClose = (path) => {
        dispatch(documentManager.saveView(viewId, path, (err) => {
          if (!err) {
            close();
          }
        }));
      };
      if (getViewIsModified(state, { viewId })) {
        openModal(windowId, {
          type: 'dialog',
          title: 'Close view',
          message: 'Would you want to close view without saving ?',
          buttons: [
            { label: 'Close view without saving', value: 'close', type: 'danger' },
            { label: 'Close and save view', value: 'save_and_close' },
          ],
        }, (closeModalAction) => {
          if (closeModalAction.payload.choice === 'close') {
            close();
          } else if (closeModalAction.payload.choice === 'save_and_close') {
            const saveAs = !view.oId && !view.absolutePath;
            if (saveAs) {
              openDialog(windowId, 'save', {}, (closeDialogAction) => {
                const { choice } = closeDialogAction.payload;
                if (choice) {
                  const absolutePath = choice;
                  saveAndClose(absolutePath);
                }
              });
            } else {
              saveAndClose(view.absolutePath);
            }
          }
        });
      } else {
        close();
      }
    }
    return nextAction;
  }
));

export default makeOnCloseView;
