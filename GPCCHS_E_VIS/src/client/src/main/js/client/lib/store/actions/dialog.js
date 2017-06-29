import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

const openDialog = simple(types.HSC_OPEN_DIALOG, 'windowId', 'id', 'type', 'options');

const closeDialog = simple(
  types.HSC_CLOSE_DIALOG,
  'windowId',
  'id',
  'choice'
);

export default {
  openDialog,
  closeDialog,
};
