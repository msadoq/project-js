import * as types from '../../types';

export default function createDialogInteraction(action) {
  return dialogId => (
    action.type === types.HSC_DIALOG_CLOSED && action.payload.dialogId === dialogId
  );
}
