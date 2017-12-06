import * as types from 'store/types';
import { getWindowIdByViewId } from 'store/selectors/windows';
import { getView } from 'store/reducers/views';

import { open as openModal } from 'store/actions/modals';
import withListenAction from 'store/helpers/withListenAction';

const makeOnReloadView = documentManager => withListenAction(
  ({ dispatch, getState, listenAction }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_RELOAD_VIEW) {
      const state = getState();
      const { viewId } = action.payload;
      const windowId = getWindowIdByViewId(state, { viewId });
      const { isModified } = getView(state, { viewId });
      if (!isModified) {
        dispatch(documentManager.reloadView(viewId));
      } else {
        dispatch(openModal(windowId, {
          type: 'dialog',
          title: 'Reload view',
          message: 'If you continue, view modifications will be lost.',
          buttons: [
            { label: 'Reload view', value: 'reload', type: 'warning' },
            { label: 'Cancel' },
          ],
        }));
        listenAction(types.WS_MODAL_CLOSE, (closeAction) => {
          if (closeAction.payload.choice === 'reload') {
            dispatch(documentManager.reloadView(viewId));
          }
        });
      }
    }
    return nextAction;
  }
);

export default makeOnReloadView;
