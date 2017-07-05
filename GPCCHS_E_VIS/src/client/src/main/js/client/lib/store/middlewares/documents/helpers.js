import { v4 } from 'uuid';
import * as types from '../../types';
import { openDialog } from '../../actions/ui';

const createDialogHelper = ({ dispatch }) => {
  const dialogCache = {};
  const open = (windowId, type, onClose) => {
    const dialogId = v4();
    dialogCache[dialogId] = onClose;
    dispatch(openDialog(windowId, dialogId, type));
  };
  const interact = (action) => {
    if (action.type === types.HSC_DIALOG_CLOSED && dialogCache[action.payload.dialogId]) {
      const onClose = dialogCache[action.payload.dialogId];
      dialogCache[action.payload.dialogId] = undefined;
      onClose(action);
    }
  };
  return {
    open,
    interact,
  };
};

export const withOpenDialog = middleware => (storeApi) => {
  const dialogHelper = createDialogHelper(storeApi);
  return next => (action) => {
    dialogHelper.interact(action);
    return middleware({ ...storeApi, openDialog: dialogHelper.open })(next)(action);
  };
};

export const withOpenModal = x => x;
