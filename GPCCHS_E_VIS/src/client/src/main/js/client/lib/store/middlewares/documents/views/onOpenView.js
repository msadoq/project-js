// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add an options parameter to openDialog documents helper
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction' in middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On open view middleware .
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withlistenAction middleware enhancer in onOpenView
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Change openModal action, it now have a default dialogId
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when open a view
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --VIEW
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : Add some TODO tests in onOpenPage and onOpenView documents middlewares
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { join } from 'path';

import { askOpenWorkspace } from 'store/actions/hsc';
import { getIsWorkspaceOpened } from 'store/reducers/hsc';
import { get } from 'common/configurationManager';
import * as types from 'store/types';
import { getFocusedWindow } from 'store/selectors/windows';
import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';

import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';
import { getUniqueWindow } from '../selectors';
import { open as openModal } from '../../../actions/modals';

const isAbsolute = _.startsWith('/');
const getPath = path => (isAbsolute(path) ? path : join(get('ISIS_DOCUMENTS_ROOT'), path)); // TODO test this branch

const findOpenedView = (state, viewAbsolutePath) =>
  state.views && Object.values(state.views).find(v => v.absolutePath === viewAbsolutePath);

const makeOnOpenView = documentManager => withListenAction(
  ({ dispatch, listenAction, getState }) => next => (action) => {
    const nextAction = next(action);
    const state = getState();
    if (action.type === types.WS_ASK_OPEN_VIEW) {
      if (!getIsWorkspaceOpened(state)) {
        dispatch(askOpenWorkspace(null, null, true, false)); // TODO test this branch
      }
      const window = getFocusedWindow(state) || getUniqueWindow(state); // TODO test this branch
      const windowId = window.uuid; // HERE
      const absolutePath = action.payload.absolutePath && getPath(action.payload.absolutePath);
      if (absolutePath) {
        dispatch(documentManager.openView({ absolutePath }, window.focusedPage));
      } else {
        dispatch(openDialog(windowId, 'open', {
          filters: getOpenExtensionsFilters(),
          defaultPath: getDefaultFolder(state),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            const foundOpenedView = findOpenedView(state, choice[0]);

            const askOpenViewConfirmation = () => {
              dispatch(openModal(windowId, {
                type: 'dialog',
                title: 'Confirmation for opening page',
                message: 'This view file is already open. Do you want to open a copy?',
                buttons: [
                  { label: 'Cancel', value: 'cancel', type: 'default' },
                  { label: 'Open a copy in this page', value: 'open', type: 'primary' },
                ],
              }));
              listenAction(types.WS_MODAL_CLOSE, (confirmCloseAction) => {
                if (confirmCloseAction.payload.choice === 'cancel') {
                  // closes modal and do nothing
                }

                if (confirmCloseAction.payload.choice === 'open') {
                  dispatch(documentManager.openView({
                    absolutePath: foundOpenedView.absolutePath,
                    isModified: true,
                  }, window.focusedPage));
                }
              });
            };

            if (foundOpenedView) {
              askOpenViewConfirmation();
            } else {
              dispatch(documentManager.openView({ absolutePath: choice[0] }, window.focusedPage));
            }
          }
        });
      }
    }
    return nextAction;
  }
);

export default makeOnOpenView;
