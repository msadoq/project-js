import * as types from '../../types';

const initialState = {
  // editor
  editorWidth: 0,
  editorViewId: undefined,
  // timebar
  timebarHeight: 130,
  timebarCollapsed: false,
  // explorer
  explorerWidth: 0,
  explorerTab: undefined,
};

const panels = (state = initialState, action) => {
  switch (action.type) {
    case types.WS_PAGE_OPEN:
    case types.WS_PAGE_ADD_BLANK:
      return { ...state };
    case types.WS_PAGE_PANELS_LOAD_IN_EDITOR:
      return { ...state, editorViewId: action.payload.viewId };
    case types.WS_PAGE_PANELS_RESIZE_EDITOR:
      return { ...state, editorWidth: action.payload.size };
    case types.WS_PAGE_PANELS_RESIZE_TIMEBAR:
      return { ...state, timebarHeight: action.payload.size };
    case types.WS_PAGE_PANELS_COLLAPSE_TIMEBAR:
      return { ...state, timebarCollapsed: action.payload.flag };
    case types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER:
      return { ...state, explorerTab: action.payload.focusedTab };
    case types.WS_PAGE_PANELS_RESIZE_EXPLORER:
      return { ...state, explorerWidth: action.payload.size };
    default:
      return state;
  }
};

export default panels;
