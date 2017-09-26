// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : documents middleware now next the action before doing anything else
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Improve SaveAgentModal + onClosePage / onSavePage seems to be OK
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename SaveAgent in SaveWizard .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add an options parameter to openDialog documents helper
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix bug with oId in documents middlewares (onSavePage and onSaveView)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction' in middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add SaveAgentModal to ModalGeneric .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix bug with page.absolutePath while saving a page
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : SaveWizardModal can now take several buttons
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with extensions.
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when save a page
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// END-HISTORY
// ====================================================================

import * as types from '../../../types';

import { getPage } from '../../../reducers/pages';
import { getPageNewViewIds, getPageHasNewViews } from '../selectors';
import { getWindowIdByPageId } from '../../../reducers/windows';

import { openDialog } from '../../../actions/ui';
import { open as openModal } from '../../../actions/modals';
import withListenAction from '../../../helpers/withListenAction';

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
