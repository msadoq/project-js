// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fix explorer opening with fresh state (no tabId is stored)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix explorer opening with fresh state (no tabId is stored)
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Move panels loading in panels reducer
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// END-HISTORY
// ====================================================================

import * as types from 'store/types';

const initialState = {
  // editor
  editorWidth: 250,
  editorViewId: undefined,
  editorIsMinimized: true,
  // timebar
  timebarHeight: 130,
  timebarIsMinimized: false,
  // explorer
  explorerWidth: 250,
  explorerTab: undefined,
  explorerIsMinimized: true,
};

const panels = (state = initialState, action) => {
  switch (action.type) {
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED:
      return { ...state, ...action.payload.page.panels };
    case types.WS_PAGE_PANELS_LOAD_IN_EDITOR:
      return { ...state, editorViewId: action.payload.viewId };
    case types.WS_PAGE_PANELS_RESIZE_EDITOR:
      return { ...state, editorWidth: action.payload.size };
    case types.WS_PAGE_PANELS_MINIMIZE_EDITOR:
      return { ...state, editorIsMinimized: action.payload.isMinimized };
    case types.WS_PAGE_PANELS_RESIZE_TIMEBAR:
      return { ...state, timebarHeight: action.payload.size };
    case types.WS_PAGE_PANELS_MINIMIZE_TIMEBAR:
      return { ...state, timebarIsMinimized: action.payload.isMinimized };
    case types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER:
      return { ...state, explorerTab: action.payload.focusedTab };
    case types.WS_PAGE_PANELS_RESIZE_EXPLORER:
      return { ...state, explorerWidth: action.payload.size };
    case types.WS_PAGE_PANELS_MINIMIZE_EXPLORER:
      return { ...state, explorerIsMinimized: action.payload.isMinimized };
    default:
      return state;
  }
};

export default panels;
