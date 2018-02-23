
import withListenAction from 'store/helpers/withListenAction';

import * as types from 'store/types';
import { open as openModal } from 'store/actions/modals';
import { getWindowIdByViewId } from 'store/selectors/windows';
import { removeEntryPoint } from 'store/actions/views';

const makeOnUserAction = () => withListenAction(
  ({ getState, dispatch, listenAction }) => next => (action) => {
    const state = getState();
    const { payload } = action;

    switch (action.type) {
      case types.WS_VIEW_ASK_REMOVE_ENTRYPOINT:
        askConfirmation(payload.viewId, payload.entryPoint);
        break;
      default:
        break;
    }

    function askConfirmation(viewId, entryPoint) {
      const windowId = getWindowIdByViewId(state, { viewId });

      dispatch(openModal(windowId, {
        type: 'dialog',
        title: 'Confirmation',
        message: `Are you sure you want to remove entry point ${entryPoint.name} ?`,
        buttons: [
          { label: 'Remove', value: 'remove', type: 'primary' },
          { label: 'Cancel', value: 'cancel', type: 'default' },
        ],
      }));
      listenAction(types.WS_MODAL_CLOSE, (closeAction) => {
        if (closeAction.payload.choice === 'remove') {
          dispatch(removeEntryPoint(viewId, entryPoint.id));
        }
      });
    }

    return next(action);
  }
);

export default makeOnUserAction;
