import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import * as types from '../../types';
import { openDialog } from '../../actions/ui';
import createDialogInteraction from './dialogUtils';

import { add as addMessage } from '../../actions/messages';
import { closePage } from '../../actions/pages';
import { getPage } from '../../reducers/pages';
import { getPageHasUnsavedViews } from '../../selectors/pages';
import { getWindowIdByPageId } from '../../reducers/windows';

const onOpenPage = documentManager => (
  ({ dispatch }) => next => (action) => {
    // ask open page
    if (action.type === types.WS_ASK_OPEN_PAGE) {
      const { windowId, absolutePath } = action.payload;
      if (absolutePath) {
        dispatch(documentManager.openPage({ windowId, absolutePath }));
      } else {
        dispatch(openDialog(action.payload.windowId, 'open_page', 'open'));
      }
    }

    // interaction open page
    const interaction = createDialogInteraction(action);
    if (interaction('open_page')) {
      const { windowId, choice } = action.payload;
      if (choice) {
        const absolutePath = choice[0];
        dispatch(documentManager.openPage({ windowId, absolutePath }));
      }
    }
    return next(action);
  }
);

const onSavePage = documentManager => (
  ({ getState, dispatch }) => next => (action) => {
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
        dispatch(openDialog(windowId, 'save_page_as', 'save', { pageId }));
      } else {
        dispatch(documentManager.savePage(pageId));
      }
    }
    const interaction = createDialogInteraction(action);
    if (interaction('save_page_as')) {
      const { options, choice } = action.payload;
      if (choice) {
        const absolutePath = choice;
        dispatch(documentManager.savePage(options.pageId, absolutePath));
      }
    }
    return next(action);
  }
);

const onClosePage = () => (
  ({ getState, dispatch }) => next => (action) => {
    if (action.type === types.WS_ASK_CLOSE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const page = getPage(state, { pageId });
      const hasUnsavedViews = getPageHasUnsavedViews(state, { pageId });
      const windowId = getWindowIdByPageId(state, { pageId });
      const dialogNeedSave = message => openDialog(windowId, 'page_need_save', 'message', {
        pageId,
        message,
        buttons: ['Yes', 'No', 'Cancel'],
      });
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

const createPagesMiddleware = documentManager => pipeMiddlewares(
  onOpenPage(documentManager),
  onSavePage(documentManager),
  onClosePage(documentManager)
);

export default createPagesMiddleware;
