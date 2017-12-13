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
