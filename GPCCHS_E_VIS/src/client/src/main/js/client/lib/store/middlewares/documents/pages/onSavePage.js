import * as types from '../../../types';

import { getPage } from '../../../reducers/pages';
import { getPageHasUnsavedViews } from '../../../selectors/pages';
import { getWindowIdByPageId } from '../../../reducers/windows';

const onSavePage = documentManager => (
  ({ getState, dispatch, openDialog, openModal }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_SAVE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const page = getPage(state, { pageId });
      const saveAs = action.payload.saveAs || (!page.oid && !page.absolutePath);
      const windowId = getWindowIdByPageId(state, { pageId });
      if (getPageHasUnsavedViews(state, { pageId })) {
        // here save agent
        openModal(windowId, { type: 'saveAgent', pageId }, () => {
          // console.warn(closeAction);
        });
      } else if (saveAs) {
        openDialog(windowId, 'save', (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            const absolutePath = choice;
            dispatch(documentManager.savePage(pageId, absolutePath));
          }
        });
      } else {
        dispatch(documentManager.savePage(pageId, page.absolutePath));
      }
    }
    return returnedAction;
  }
);


export default onSavePage;
