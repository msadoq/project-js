import * as types from '../../../types';
// import { openDialog } from '../../../actions/ui';
import { open as openModal } from '../../../actions/modals';

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
      const dialogNeedSave = title => openModal(windowId, {
        title,
        type: 'dialog',
        id: 'page_need_save',
        buttons: [{ label: 'Yes', value: 'yes' }, { label: 'No' }, { label: 'Cancel' }],
        message: 'Would you want to save before closing ?',
      });
      const page = getPage(state, { pageId });
      if (page.isModified && hasUnsavedViews) {
        dispatch(dialogNeedSave('Page and views are modified'));
      } else if (page.isModified) {
        dispatch(dialogNeedSave('Page is modified'));
      } else if (hasUnsavedViews) {
        dispatch(dialogNeedSave('Views are modified'));
      } else {
        dispatch(closePage(pageId));
      }
    }
    return next(action);
  }
);

export default onClosePage;
