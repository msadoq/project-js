import * as types from '../../../types';

import { getPage } from '../../../reducers/pages';
import { getPageNewViewIds, getPageHasNewViews } from '../selectors';
import { getWindowIdByPageId } from '../../../reducers/windows';
import { withOpenDialog, withOpenModal } from '../helpers';

const onSavePage = documentManager => withOpenModal(withOpenDialog(
  ({ getState, dispatch, openDialog, openModal }) => next => (action) => {
    const returnedAction = next(action);
    if (action.type === types.WS_ASK_SAVE_PAGE) {
      const { pageId } = action.payload;
      const state = getState();
      const page = getPage(state, { pageId });
      const saveAs = action.payload.saveAs || (!page.oId && !page.absolutePath);
      const windowId = getWindowIdByPageId(state, { pageId });
      if (getPageHasNewViews(state, { pageId })) {
        openModal(windowId, {
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
        });
      } else if (saveAs) {
        openDialog(windowId, 'save', {}, (closeAction) => {
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
));


export default onSavePage;
