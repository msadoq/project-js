// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Fix mechansim for open/save/close workspace
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog enhancers directly in each middleware
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Correct VIMA shutdown on new workspace : add middleware for synchronous treatment
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction' in middlewares
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Lint fix . . . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix copy/pasta typo in onOpenWorkspace/onCloseWorkspace
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Ask open workspace at start in mainProcess/index
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Use withlistenAction middleware enhancer in onOpenWorkspace
// VERSION : 1.1.2 : FA : #7328 : 02/08/2017 : Fix closing vima when default workspace is unknown or invalid
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when open a workspace
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : VIMA can be opened with --PAGE
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { join } from 'path';

import * as types from 'store/types';
import { get } from 'common/configurationManager';
import { getWorkspaceIsModified } from 'store/reducers/hsc';
import { getModifiedPagesIds } from 'store/reducers/pages';
import { getModifiedViewsIds } from 'store/reducers/views';
import { closeWorkspace, isWorkspaceOpening } from 'store/actions/hsc';

import { openDialog } from 'store/actions/ui';
import { open as openModal } from 'store/actions/modals';
import withListenAction from 'store/helpers/withListenAction';

import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';

const isAbsolute = _.startsWith('/');
const getPath = path => (isAbsolute(path) ? path : join(get('ISIS_DOCUMENTS_ROOT'), path));

const makeOnOpenWorkspace = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_WORKSPACE) {
      const { isNew, windowId, absolutePath, noPage = false } = action.payload;
      const state = getState();

      const modifiedPagesIds = getModifiedPagesIds(state);
      const modifiedViewsIds = getModifiedViewsIds(state);

      const workspaceIsModified = getWorkspaceIsModified(state);
      const isPagesSaved = modifiedPagesIds.length === 0;
      const isViewsSaved = modifiedViewsIds.length === 0;

      const openWorkspace = () => {
        if (isNew && !absolutePath) {
          dispatch(isWorkspaceOpening(true));
          dispatch(closeWorkspace(true));
          dispatch({
            type: types.WS_WORKSPACE_OPENED,
            payload: documentManager.createBlankWorkspace({ noPage }),
          });
          dispatch(isWorkspaceOpening(false));
        } else if (absolutePath) {
          dispatch(documentManager.openWorkspace({
            absolutePath: getPath(absolutePath),
          }, (errors) => {
            if (errors && isNew) {
              dispatch({
                type: types.WS_WORKSPACE_OPENED,
                payload: documentManager.createBlankWorkspace({ noPage }),
              });
            }
          }));
        } else {
          dispatch(openDialog(windowId, 'open', {
            filters: getOpenExtensionsFilters('WorkSpace'),
            defaultPath: getDefaultFolder(state),
          }));
          listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
            const { choice } = closeAction.payload;
            if (choice) {
              dispatch(documentManager.openWorkspace({ absolutePath: choice[0] }));
            }
          });
        }
      };

      const workspaceNeedSave = (title) => {
        dispatch(openModal(windowId, {
          title,
          type: 'saveWizard',
          documentType: 'workspace',
          pageIds: modifiedPagesIds,
          viewIds: modifiedViewsIds,
          buttons: [
            {
              savedDocuments: { label: 'Open workspace', value: 'open', type: 'primary' },
              unsavedDocuments: { label: 'Open workspace without saving', value: 'open', type: 'danger' },
            },
          ],
        }));
        listenAction(types.WS_MODAL_CLOSE, (closeAction) => {
          if (closeAction.payload.choice === 'open') {
            openWorkspace();
          }
        });
      };

      if (!isViewsSaved && !isPagesSaved) {
        workspaceNeedSave('Page and views are modified');
      } else if (!isPagesSaved) {
        workspaceNeedSave('Page is modified');
      } else if (!isViewsSaved) {
        workspaceNeedSave('Views are modified');
      } else if (workspaceIsModified) {
        workspaceNeedSave('Workspace is modified');
      } else {
        openWorkspace();
      }
    }
    return nextAction;
  });

export default makeOnOpenWorkspace;
