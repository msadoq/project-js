import * as types from '../../../types';

import { closePage, askSavePage } from '../../../actions/pages';
import { getPage } from '../../../reducers/pages';
import { getPageHasUnsavedViews } from '../../../selectors/pages';
import { getWindowIdByPageId } from '../../../reducers/windows';

const onClosePage = () => (
  ({ getState, dispatch, openModal }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_CLOSE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const hasUnsavedViews = getPageHasUnsavedViews(state, { pageId });
      const windowId = getWindowIdByPageId(state, { pageId });
      const pageNeedSave = title => openModal(windowId, {
        title,
        type: 'dialog',
        buttons: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Cancel' }],
        message: 'Would you want to save before closing ?',
      }, (closeAction) => {
        if (closeAction.payload.choice === 'yes') {
          dispatch(askSavePage(pageId));
        } else if (closeAction.payload.choice === 'no') {
          dispatch(closePage(pageId));
        }
      });
      const page = getPage(state, { pageId });
      if (page.isModified && hasUnsavedViews) {
        pageNeedSave('Page and views are modified');
      } else if (page.isModified) {
        pageNeedSave('Page is modified');
      } else if (hasUnsavedViews) {
        pageNeedSave('Views are modified');
      } else {
        dispatch(closePage(pageId));
      }
    }
    return returnedAction;
  }
);

export default onClosePage;
