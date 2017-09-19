import _ from 'lodash/fp';
import { join } from 'path';

import { askOpenWorkspace } from '../../../actions/hsc';
import { getIsWorkspaceOpened } from '../../../reducers/hsc';
import { get } from '../../../../common/configurationManager';
import * as types from '../../../types';
import { getFocusedWindow } from '../../../selectors/windows';
import { openDialog } from '../../../actions/ui';
import withListenAction from '../../../helpers/withListenAction';

import { getOpenExtensionsFilters, getDefaultFolder } from '../utils';
import { getUniqueWindow } from '../selectors';

const isAbsolute = _.startsWith('/');
const getPath = path => (isAbsolute(path) ? path : join(get('ISIS_DOCUMENTS_ROOT'), path)); // TODO test this branch

const makeOnOpenView = documentManager => withListenAction(
  ({ dispatch, listenAction, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_VIEW) {
      if (!getIsWorkspaceOpened(getState())) {
        dispatch(askOpenWorkspace(null, null, true, false)); // TODO test this branch
      }
      const window = getFocusedWindow(getState()) || getUniqueWindow(getState()); // TODO test this branch
      const windowId = window.uuid; // HERE
      const absolutePath = action.payload.absolutePath && getPath(action.payload.absolutePath);
      if (absolutePath) {
        dispatch(documentManager.openView({ absolutePath }, window.focusedPage));
      } else {
        dispatch(openDialog(windowId, 'open', {
          filters: getOpenExtensionsFilters(),
          defaultPath: getDefaultFolder(getState()),
        }));
        listenAction(types.HSC_DIALOG_CLOSED, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openView({ absolutePath: choice[0] }, window.focusedPage));
          }
        });
      }
    }
    return nextAction;
  }
);

export default makeOnOpenView;
