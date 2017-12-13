import * as types from 'store/types';

import { getPage } from 'store/reducers/pages';
import { getWindowIdByPageId } from 'store/reducers/windows';
import { openDialog } from 'store/actions/ui';

import { open as openModal } from 'store/actions/modals';
import withListenAction from 'store/helpers/withListenAction';
import { getPageNewViewIds, getPageHasNewViews } from '../selectors';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnSavePage = documentManager => withListenAction(
  ({ getState, dispatch, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const page = getPage(state, { pageId });
      const saveAs = action.payload.saveAs || (!page.oId && !page.absolutePath);
      const windowId = getWindowIdByPageId(state, { pageId });
      if (getPageHasNewViews(state, { pageId })) {
        dispatch(openModal(windowId, {
          title: 'new views must be saved',
          type: 'saveWizard',
          documentType: 'page',
          pageIds: [pageId],
          viewIds: getPageNewViewIds(state, { pageId }),
          buttons: [
            {
              savedDocuments: { label: 'Ok', value: 'ok', type: 'secondary' },
              unsavedDocuments: { label: 'Ok', value: 'ok', type: 'secondary', disabled: true },
            },
          ],
        }));
      } else if (saveAs) {
        dispatch(openDialog(windowId, 'save', {
          filters: getSaveExtensionsFilters('Page'),
          defaultPath: getDefaultFolder(state),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
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
    return nextAction;
  }
);


export default makeOnSavePage;
