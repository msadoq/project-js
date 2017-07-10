import * as types from '../../../types';

import { closePage } from '../../../actions/pages';
import { getPage } from '../../../reducers/pages';
import { getWindowIdByPageId } from '../../../reducers/windows';
import { getPageUnsavedViewIds, getPageHasUnsavedViews } from '../selectors';

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
        type: 'saveAgent',
        documentType: 'page',
        mode: 'close',
        pageIds: [pageId, pageId],
        viewIds: getPageUnsavedViewIds(state, { pageId }),
      }, (closeAction) => {
        if (closeAction.payload.choice === 'close') {
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
