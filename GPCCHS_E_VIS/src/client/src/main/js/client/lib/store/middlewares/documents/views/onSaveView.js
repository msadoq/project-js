// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add an options parameter to openDialog
//  documents helper
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix bug with oId in documents middlewares
//  (onSavePage and onSaveView)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Move withOpenModal and withOpenDialog
//  enhancers directly in each middleware
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On save view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Rename all 'returnedAction' by 'nextAction'
//  in middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Fix selector in onSaveView documents
//  middleware
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Use withListenAction enhancer in documents
//  middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : Page / Views / Workspace are saved with
//  extensions.
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Rename documents/doctypes in documents/utils .
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add defaultPath when open or save a document
// VERSION : 1.1.2 : FA : #7435 : 14/09/2017 : Add extensions filter when save a view
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================
import * as types from 'store/types';

import { getView } from 'store/reducers/views';
import { getWindowIdByViewId } from 'store/selectors/windows';

import { openDialog } from 'store/actions/ui';
import withListenAction from 'store/helpers/withListenAction';

import { getSaveExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnSaveView = documentManager => withListenAction(
  ({ getState, dispatch, listenAction }) => next => (action) => {
    if (action.type === types.WS_ASK_SAVE_VIEW) {
      const { viewId } = action.payload;
      const state = getState();
      const view = getView(state, { viewId });
      const windowId = getWindowIdByViewId(state, { viewId });
      const saveAs = action.payload.saveAs || (!view.oId && !view.absolutePath);
      if (saveAs) {
        dispatch(openDialog(windowId, 'save', {
          filters: getSaveExtensionsFilters(view.type),
          defaultPath: getDefaultFolder(state),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            const absolutePath = choice;
            dispatch(documentManager.saveView(viewId, absolutePath));
          }
        });
      } else {
        dispatch(documentManager.saveView(viewId, view.absolutePath));
      }
    }
    return next(action);
  }
);

export default makeOnSaveView;
