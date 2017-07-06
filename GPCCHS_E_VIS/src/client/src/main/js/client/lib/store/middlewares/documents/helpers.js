import _ from 'lodash/fp';
import { v4 } from 'uuid';
import * as types from '../../types';
import { openDialog } from '../../actions/ui';
import { open as openModal } from '../../actions/modals';

const createDialogHelper = ({ dispatch }) => {
  const dialogCache = {};
  const open = (windowId, type, onClose = _.noop) => {
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

const createModalHelper = ({ dispatch }) => {
  const modalCache = {};
  const open = (windowId, props, onClose = _.noop) => {
    const modalId = v4();
    modalCache[modalId] = onClose;
    dispatch(openModal(windowId, { ...props, modalId }));
  };
  const interact = (action) => {
    if (action.type === types.WS_MODAL_CLOSE && modalCache[action.payload.props.modalId]) {
      const onClose = modalCache[action.payload.props.modalId];
      modalCache[action.payload.props.modalId] = undefined;
      onClose(action);
    }
  };
  return {
    open,
    interact,
  };
};

export const withOpenModal = middleware => (storeApi) => {
  const modalHelper = createModalHelper(storeApi);
  return next => (action) => {
    modalHelper.interact(action);
    return middleware({ ...storeApi, openModal: modalHelper.open })(next)(action);
  };
};

export const withOpenDialog = middleware => (storeApi) => {
  const dialogHelper = createDialogHelper(storeApi);
  return next => (action) => {
    dialogHelper.interact(action);
    return middleware({ ...storeApi, openDialog: dialogHelper.open })(next)(action);
  };
};
