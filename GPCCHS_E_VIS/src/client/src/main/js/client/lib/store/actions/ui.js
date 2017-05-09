import simple from '../simpleActionCreator';
import * as types from '../types';

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
