import * as types from '../../../types';

import { add as addMessage } from '../../../actions/messages';
import { getPage } from '../../../reducers/pages';
import { getPageHasUnsavedViews } from '../../../selectors/pages';
import { getWindowIdByPageId } from '../../../reducers/windows';

const onSavePage = documentManager => (
  ({ getState, dispatch, openDialog }) => next => (action) => {
    if (action.type === types.WS_ASK_SAVE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const page = getPage(state, { pageId });
      const saveAs = action.payload.saveAs || (!page.oid && !page.absolutePath);
      if (getPageHasUnsavedViews(state, { pageId })) {
        // here save agent
        dispatch(addMessage('global', 'error', 'Error : cannot save the page, because views are unsaved'));
      } else if (saveAs) {
        const windowId = getWindowIdByPageId(state, { pageId });
        openDialog(windowId, 'save', (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            const absolutePath = choice;
            dispatch(documentManager.savePage(pageId, absolutePath));
          }
        });
      } else {
        dispatch(documentManager.savePage(pageId));
      }
    }
    return next(action);
  }
);


export default onSavePage;
