// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when save a closing view
// END-HISTORY
// ====================================================================

import * as types from '../../../types';
import { getView, getViewIsModified } from '../../../reducers/views';
import { getWindowIdByViewId } from '../../../selectors/windows';
import { getPageIdByViewId } from '../../../reducers/pages';
import { closeView } from '../../../actions/views';
import { minimizeEditor } from '../../../actions/pages';

import { openDialog } from '../../../actions/ui';
import { open as openModal } from '../../../actions/modals';
import withListenAction from '../../../helpers/withListenAction';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const closeEditor = pageId => minimizeEditor(pageId, true);

const makeOnCloseView = documentManager => withListenAction(
  ({ dispatch, listenAction, getState }) => next => (action) => {
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
        dispatch(openModal(windowId, {
          type: 'dialog',
          title: 'Close view',
          message: 'Would you want to close view without saving ?',
          buttons: [
            { label: 'Close view without saving', value: 'close', type: 'danger' },
            { label: 'Close and save view', value: 'save_and_close' },
          ],
        }));
        listenAction(types.WS_MODAL_CLOSE, (closeModalAction) => {
          if (closeModalAction.payload.choice === 'close') {
            close();
          } else if (closeModalAction.payload.choice === 'save_and_close') {
            const saveAs = !view.oId && !view.absolutePath;
            if (saveAs) {
              dispatch(openDialog(windowId, 'save', {
                filters: getSaveExtensionsFilters(view.type),
                defaultPath: getDefaultFolder(state),
              }));
              listenAction(types.HSC_DIALOG_CLOSED, (closeDialogAction) => {
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
);

export default makeOnCloseView;
