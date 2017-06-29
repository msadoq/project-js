import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

// editor
export const updateViewTab = simple(
  types.WS_EDITOR_UI_TAB,
  'viewId',
  'tab'
);

export const updateViewPanels = simple(
  types.WS_EDITOR_UI_PANEL,
  'viewId',
  'section',
  'panels'
);

export const updateViewSubPanels = simple(
  types.WS_EDITOR_UI_SUBPANEL,
  'viewId',
  'section',
  'panel',
  'subPanels'
);

export const openDialog = simple(
  types.HSC_OPEN_DIALOG,
  'windowId',
  'dialogId',
  'type', // can be 'save', 'open' or 'message'
  (options = {}) => ({ options })
);

// dialog
export const dialogClosed = simple(
  types.HSC_DIALOG_CLOSED,
  'windowId',
  'dialogId',
  'choice'
);
