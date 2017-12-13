// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Write onClosePage middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add withOpenModal middleware enhancer (in documents middleware)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : documents middleware now next the action before doing anything else
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Improve SaveAgentModal + onClosePage / onSavePage seems to be OK
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename SaveAgent in SaveWizard .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add SaveAgentModal to ModalGeneric .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix onClosePage documents middleware duplicate pageId
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : SaveAgentModal component can be in a workspace mode
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction' in middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix SaveAgentModal css layout .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : SaveWizardModal can now take several buttons
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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
