import * as types from '../../types';
import { openDialog } from '../../actions/ui';
import createDialogInteraction from './dialogUtils';

export default function createPagesMiddleware(documentManager) {
  return ({ dispatch }) => next => (action) => {
    // ask open page
    if (action.type === types.WS_ASK_OPEN_PAGE) {
      const { windowId, absolutePath } = action.payload;
      if (absolutePath) {
        dispatch(documentManager.openPage({ windowId, absolutePath }));
      } else {
        dispatch(openDialog(action.payload.windowId, 'open_page', 'open'));
      }
    }

    // interaction open page
    const interaction = createDialogInteraction(action);
    if (interaction('open_page')) {
      const { windowId, choice } = action.payload;
      if (choice) {
        const absolutePath = choice[0];
        dispatch(documentManager.openPage({ windowId, absolutePath }));
      }
    }
    return next(action);
  };
}
