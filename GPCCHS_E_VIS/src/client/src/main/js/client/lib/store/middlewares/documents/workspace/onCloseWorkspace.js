import _ from 'lodash/fp';
import * as types from '../../../types';
import { getWorkspaceIsModified } from '../../../reducers/hsc';
import { getWindowIds } from '../../../reducers/windows';

import { closeWindow } from '../../../actions/windows';
import { closeWorkspace } from '../../../actions/hsc';
import { withOpenModal } from '../helpers';
import {
  getModifiedViewIdsByWindowIds,
  getModifiedPageIdsByWindowIds,
} from '../selectors';

const isClosingWorkspace = _.propEq('type', types.WS_ASK_CLOSE_WORKSPACE);
const isClosingWindow = _.propEq('type', types.WS_ASK_CLOSE_WINDOW);

const makeOnCloseWorkspace = () => withOpenModal(
  ({ getState, dispatch, openModal }) => next => (action) => {
    const nextAction = next(action);
    if (isClosingWindow(action) || isClosingWorkspace(action)) {
      const { windowId, keepMessages = false } = action.payload;
      const state = getState();
      const allWindowIds = getWindowIds(state);
      const windowIds = isClosingWindow(action) ? [windowId] : allWindowIds;

      const modifiedPagesIds = getModifiedPageIdsByWindowIds(state, { windowIds });
      const modifiedViewsIds = getModifiedViewIdsByWindowIds(state, { windowIds });

      const isPagesSaved = modifiedPagesIds.length === 0;
      const isViewsSaved = modifiedViewsIds.length === 0;

      const documentType = (
        (isClosingWorkspace(action) || (allWindowIds.length === 1 && allWindowIds[0] === windowId))
        ? 'workspace'
        : 'window'
      );

      const workspaceNeedSave = title => openModal(windowId, {
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
      }, (closeAction) => {
        if (closeAction.payload.choice === 'close') {
          if (isClosingWindow(action)) {
            dispatch(closeWindow(windowId));
          } else if (isClosingWorkspace(action)) {
            dispatch(closeWorkspace(keepMessages));
          }
        }
      });

      if (!isViewsSaved && !isPagesSaved) {
        workspaceNeedSave('Page and views are modified');
      } else if (!isPagesSaved) {
        workspaceNeedSave('Page is modified');
      } else if (!isViewsSaved) {
        workspaceNeedSave('Views are modified');
      } else if (getWorkspaceIsModified(state) && isClosingWorkspace(state)) {
        workspaceNeedSave('Workspace is modified');
      } else if (isClosingWindow(action)) {
        dispatch(closeWindow(windowId));
      } else if (isClosingWorkspace(action)) {
        dispatch(closeWorkspace(keepMessages));
      }
    }
    return nextAction;
  });

export default makeOnCloseWorkspace;
