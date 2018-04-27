// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveViewAsModel documents middleware .
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents
//  middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with
//  extensions.
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when save a view as model
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================
import * as types from 'store/types';

import { getView } from 'store/reducers/views';
import { getWindowIdByViewId } from 'store/selectors/windows';
import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnSaveViewAsModel = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_SAVE_VIEW_AS_MODEL) {
      const { viewId } = action.payload;
      const state = getState();
      const view = getView(state, { viewId });
      const windowId = getWindowIdByViewId(state, { viewId });
      dispatch(openDialog(windowId, 'save', {
        filters: getSaveExtensionsFilters(view.type),
        defaultPath: getDefaultFolder(state),
      }));
      listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
        if (closeAction.payload.choice) {
          const absolutePath = closeAction.payload.choice;
          dispatch(documentManager.saveViewAsModel(viewId, absolutePath));
        }
      });
    }
    return nextAction;
  }
);

export default makeOnSaveViewAsModel;
