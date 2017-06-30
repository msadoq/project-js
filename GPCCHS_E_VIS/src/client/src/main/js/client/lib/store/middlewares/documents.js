import * as types from '../types';
import { openDialog } from '../actions/ui';

const getDialogInteraction = action => dialogId => (
  action.type === types.HSC_DIALOG_CLOSED && action.payload.dialogId === dialogId
);

const dialogInteraction = ({ dispatch, documentManager }, next, action) => {
  const interaction = getDialogInteraction(action);
  if (interaction('open_page')) {
    const { windowId, choice } = action.payload;
    if (choice) {
      const absolutePath = choice[0];
      dispatch(documentManager.openPage({ windowId, absolutePath }));
    }
  }
  return next(action);
};

const askForPage = ({ dispatch }, next, action) => {
  if (!action.payload.options) {
    dispatch(openDialog(action.payload.windowId, 'open_page', 'open'));
  }
  return next(action);
};

export default function createDocumentsMiddleware(documentManager) {
  return ({ dispatch }) => next => (action) => {
    if (action.type === types.WS_ASK_PAGE) {
      return askForPage({ dispatch }, next, action);
    }
    if (action.type === types.HSC_DIALOG_CLOSED) {
      return dialogInteraction({ dispatch, documentManager }, next, action);
    }
    return next(action);
  };
}
