import * as types from '../../../types';

import { openDialog } from '../../../actions/ui';
import withListenAction from '../../../helpers/withListenAction';

import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';

const makeOnOpenPage = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_PAGE) {
      const { windowId, absolutePath } = action.payload;
      if (absolutePath) {
        dispatch(documentManager.openPage({ windowId, absolutePath }));
      } else {
        dispatch(openDialog(windowId, 'open', {
          filters: getOpenExtensionsFilters('Page'),
          defaultPath: getDefaultFolder(getState()),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openPage({ windowId, absolutePath: choice[0] }));
          }
        });
      }
    }
    return nextAction;
  }
);

export default makeOnOpenPage;
