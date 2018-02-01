// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored in store.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text. state.ui
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Move dialog actions in actions/ui
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement ui/dialog reducer . .
// VERSION : 1.1.2 : FA : #7145 : 26/07/2017 : Change openModal action, it now have a default dialogId
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store folder in mainProcess
// END-HISTORY
// ====================================================================

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

// dialog
export const openDialog = simple(
  types.HSC_OPEN_DIALOG,
  'windowId',
  'type', // can be 'save', 'open' or 'message'
  (options = {}) => ({ options }),
  (dialogId = 'default') => ({ dialogId })
);

export const dialogClosed = simple(
  types.HSC_DIALOG_CLOSED,
  'windowId',
  'choice',
  (options = {}) => ({ options }),
  (dialogId = 'default') => ({ dialogId })
);

// wiki helper
export const openWikiHelper = simple(types.HSC_OPEN_WIKI_HELPER);
