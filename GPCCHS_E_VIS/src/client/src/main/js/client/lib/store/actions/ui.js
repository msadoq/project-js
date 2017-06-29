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
  'id',
  'type',
  'options'
);

// dialog
export const closeDialog = simple(
  types.HSC_CLOSE_DIALOG,
  'windowId',
  'id',
  'choice'
);
