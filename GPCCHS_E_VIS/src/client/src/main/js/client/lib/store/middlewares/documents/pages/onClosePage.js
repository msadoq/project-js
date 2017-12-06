import * as types from 'store/types';

import { closePage } from 'store/actions/pages';
import { getPage } from 'store/reducers/pages';
import { getWindowIdByPageId } from 'store/reducers/windows';
import { open as openModal } from 'store/actions/modals';

import withListenAction from 'store/helpers/withListenAction';
import { getPageUnsavedViewIds, getPageHasUnsavedViews } from '../selectors';

const makeOnClosePage = () => withListenAction(
  ({ getState, dispatch, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_CLOSE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const hasUnsavedViews = getPageHasUnsavedViews(state, { pageId });
      const windowId = getWindowIdByPageId(state, { pageId });
      const pageNeedSave = (title) => {
        dispatch(openModal(windowId, {
          title,
          type: 'saveWizard',
          documentType: 'page',
          pageIds: [pageId],
          viewIds: getPageUnsavedViewIds(state, { pageId }),
          buttons: [
            {
              savedDocuments: { label: 'Close page', value: 'close', type: 'primary' },
              unsavedDocuments: { label: 'Close page without saving', value: 'close', type: 'danger' },
            },
          ],
        }));
        listenAction(types.WS_MODAL_CLOSE, (closeAction) => {
          if (closeAction.payload.choice === 'close') {
            dispatch(closePage(pageId));
          }
        });
      };
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
    return nextAction;
  }
);

export default makeOnClosePage;
