import {
  FOCUS_PAGE,
  ADD_WINDOW,
  DEL_WINDOW,
  MOUNT_PAGE,
  UNMOUNT_PAGE,
} from '../actions/windows';
import _ from 'lodash';

function geometry(state = {
  width: 800,
  height: 600,
  x: 10,
  y: 10,
}, action) {
  switch (action.type) {
    case ADD_WINDOW:
      return {
        width: 800,
        height: 600,
        x: 10,
        y: 10,
      };
    default:
      return state;
  }
}

function pages(state = [], action) {
  switch (action.type) {
    case MOUNT_PAGE:
      return state.concat([action.pageId]);
    case UNMOUNT_PAGE:
      return state.filter(pageId => pageId !== action.pageId);
    default:
      return state;
  }
}

function window(state = {
  title: null,
  focusedTab: null,
  pages: [],
  geometry: {},
}, action) {
  switch (action.type) {
    case ADD_WINDOW:
      return Object.assign({}, state, {
        title: action.title,
        geometry: geometry(state.geometry, action)
      });
    case FOCUS_PAGE:
      return Object.assign({}, state, {
        focusedTab: action.pageId,
      });
    case MOUNT_PAGE:
    case UNMOUNT_PAGE:
      return Object.assign({}, state, {
        focusedTab: action.pageId,
        pages: pages(state.pages, action),
      });
    default:
      return state;
  }
}

export default function windows(state = {}, action) {
  switch (action.type) {
    case FOCUS_PAGE:
    case MOUNT_PAGE:
    case UNMOUNT_PAGE:
      return Object.assign({}, state, {
        [action.windowId]: window(state[action.windowId], action)
      });
    case ADD_WINDOW:
      return {
        ...state,
        [action.windowId]: window(undefined, action),
      };
    case DEL_WINDOW:
      return _.omit(state, [action.windowId]);
    default:
      return state;
  }
}
