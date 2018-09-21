/* eslint-disable no-undef */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Fix mechansim for open/save/close workspace
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog
//  enhancers directly in each middleware
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard
//  (documents middleware)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix onCloseWorkspace documentType to
//  workspace
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix copy/pasta typo in
//  onOpenWorkspace/onCloseWorkspace
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction'
//  in middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Ask open workspace at start in
//  mainProcess/index
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Fix little bug in onCloseWorkspace middleware
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Use withlistenAction middleware enhancer in
//  onCloseWorkspace
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2256 : 07/03/2018 : Display confirmation dialog before closing a
//  window or a workspace
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';
import { getWorkspaceIsModified } from 'store/reducers/hsc';
import { getWindowIds } from 'store/reducers/windows';

import { closeWindow } from 'store/actions/windows';
import { closeWorkspace } from 'store/actions/hsc';
import { open as openModal } from 'store/actions/modals';

import withListenAction from 'store/helpers/withListenAction';
import {
  getModifiedViewIdsByWindowIds,
  getModifiedPageIdsByWindowIds,
} from '../selectors';

const isClosingWorkspace = _.propEq('type', types.WS_ASK_CLOSE_WORKSPACE);
const isClosingWindow = _.propEq('type', types.WS_ASK_CLOSE_WINDOW);

const makeOnCloseWorkspace = () => withListenAction(
  ({ getState, dispatch, listenAction }) => next => (action) => {
    if (isClosingWindow(action) || isClosingWorkspace(action)) {
      const { windowId, keepMessages = false } = action.payload;
      const state = getState();
      const allWindowIds = getWindowIds(state);
      const windowIds = isClosingWindow(action) ? [windowId] : allWindowIds;

      const modifiedPagesIds = getModifiedPageIdsByWindowIds(state, { windowIds });
      const modifiedViewsIds = getModifiedViewIdsByWindowIds(state, { windowIds });

      const isPagesSaved = modifiedPagesIds.length === 0;
      const isViewsSaved = modifiedViewsIds.length === 0;

      const isLastWindow = (allWindowIds.length === 1 && allWindowIds[0] === windowId);
      const documentType = (
        (isClosingWorkspace(action) || isLastWindow)
          ? 'workspace'
          : 'window'
      );

      const workspaceNeedSave = (title) => {
        dispatch(openModal(windowId, {
          title,
          type: 'saveWizard',
          documentType,
          pageIds: modifiedPagesIds,
          viewIds: modifiedViewsIds,
          buttons: [
            {
              savedDocuments: { label: `Close ${documentType}`, value: 'close', type: 'primary' },
              unsavedDocuments: { label: `Close ${documentType} without saving`, value: 'close', type: 'danger' },
            },
          ],
        }));
        listenAction(types.WS_MODAL_CLOSE, (closeAction) => {
          if (closeAction.payload.choice === 'close') {
            if (isClosingWindow(action)) {
              dispatch(closeWindow(windowId));
            } else if (isClosingWorkspace(action)) {
              dispatch(closeWorkspace(keepMessages));
            }
          }
        });
      };

      const askCloseConfirmation = (windowOrWorkspace) => {
        dispatch(openModal(windowId, {
          type: 'dialog',
          title: 'Confirmation',
          message: 'Are you sure you want to quit?',
          buttons: [
            { label: `Yes, close ${windowOrWorkspace}`, value: 'quit', type: 'primary' },
            { label: 'Cancel', value: 'cancel', type: 'default' },
          ],
        }));
        listenAction(types.WS_MODAL_CLOSE, (closeAction) => {
          if (closeAction.payload.choice === 'quit') {
            if (windowOrWorkspace === 'window') {
              dispatch(closeWindow(windowId));
            } else if (windowOrWorkspace === 'workspace') {
              dispatch(closeWorkspace(keepMessages));
            }
          }
        });
      };

      if (!isViewsSaved && !isPagesSaved) {
        workspaceNeedSave('Page and views are modified');
      } else if (!isPagesSaved) {
        workspaceNeedSave('Page is modified');
      } else if (!isViewsSaved) {
        workspaceNeedSave('Views are modified');
      } else if (getWorkspaceIsModified(state) && (isClosingWorkspace(action) || isLastWindow)) {
        workspaceNeedSave('Workspace is modified');
      } else if (isClosingWindow(action)) {
        askCloseConfirmation('window');
      } else if (isClosingWorkspace(action)) {
        askCloseConfirmation('workspace');
      }
    }
    return next(action);
  });

export default makeOnCloseWorkspace;
