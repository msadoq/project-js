import * as types from '../../../types';
import { getModifiedPagesIds } from '../../../reducers/pages';
import { getModifiedViewsIds } from '../../../reducers/views';
import { closeWorkspace } from '../../../actions/hsc';

const onCloseWorkspace = () => (
  ({ getState, dispatch, openModal }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_CLOSE_WORKSPACE) {
      const { windowId } = action.payload;
      const state = getState();

      const modifiedPagesIds = getModifiedPagesIds(state);
      const modifiedViewsIds = getModifiedViewsIds(state);

      const isPagesSaved = modifiedPagesIds.length === 0;
      const isViewsSaved = modifiedViewsIds.length === 0;

      const workspaceNeedSave = title => openModal(windowId, {
        title,
        type: 'saveWizard',
        documentType: 'workspace',
        pageIds: modifiedPagesIds,
        viewIds: modifiedViewsIds,
        buttons: [
          {
            savedDocuments: { label: 'Close workspace', value: 'close', type: 'primary' },
            unsavedDocuments: { label: 'Close workspace without saving', value: 'close', type: 'danger' },
          },
        ],
      }, (closeAction) => {
        if (closeAction.payload.choice === 'close') {
          dispatch(closeWorkspace());
        }
      });

      if (!isViewsSaved && !isPagesSaved) {
        workspaceNeedSave('Page and views are modified');
      } else if (!isPagesSaved) {
        workspaceNeedSave('Page is modified');
      } else if (!isViewsSaved) {
        workspaceNeedSave('Views are modified');
      } else {
        dispatch(closeWorkspace());
      }
    }
    return returnedAction;
  });

export default onCloseWorkspace;
