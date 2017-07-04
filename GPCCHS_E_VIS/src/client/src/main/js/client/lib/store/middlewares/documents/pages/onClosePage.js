import * as types from '../../../types';
import { openDialog } from '../../../actions/ui';

import { closePage } from '../../../actions/pages';
import { getPage } from '../../../reducers/pages';
import { getPageHasUnsavedViews } from '../../../selectors/pages';
import { getWindowIdByPageId } from '../../../reducers/windows';

const onClosePage = () => (
  ({ getState, dispatch }) => next => (action) => {
    if (action.type === types.WS_ASK_CLOSE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const hasUnsavedViews = getPageHasUnsavedViews(state, { pageId });
      const windowId = getWindowIdByPageId(state, { pageId });
      const dialogNeedSave = message => openDialog(windowId, 'page_need_save', 'message', {
        pageId,
        message,
        buttons: ['Yes', 'No', 'Cancel'],
      });
      const page = getPage(state, { pageId });
      if (page.isModified && hasUnsavedViews) {
        // here modal type dialog
        dispatch(dialogNeedSave('Page and views are modified, would you want to save before closing ?'));
      } else if (page.isModified) {
        // here modal type dialog
        dispatch(dialogNeedSave('Page is modified, would you want to save before closing ?'));
      } else if (hasUnsavedViews) {
        // here modal type dialog
        dispatch(dialogNeedSave('Views are modified, would you want to save before closing ?'));
      } else {
        dispatch(closePage(pageId));
      }
    }
    return next(action);
  }
);

export default onClosePage;
