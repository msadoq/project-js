import * as types from '../../../types';
import { withOpenModal } from '../helpers';
import { getWindowIdByViewId } from '../../../selectors/windows';
import { getView } from '../../../reducers/views';

const makeOnReloadView = documentManager => withOpenModal(
  ({ dispatch, openModal, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_RELOAD_VIEW) {
      const state = getState();
      const { viewId } = action.payload;
      const windowId = getWindowIdByViewId(state, { viewId });
      const { isModified } = getView(state, { viewId });
      if (!isModified) {
        dispatch(documentManager.reloadView(viewId));
      } else {
        openModal(windowId, {
          type: 'dialog',
          title: 'Reload view',
          message: 'If you continue, view modifications will be lost.',
          buttons: [
            { label: 'Reload view', value: 'reload', type: 'warning' },
            { label: 'Cancel' },
          ],
        }, (closeAction) => {
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
