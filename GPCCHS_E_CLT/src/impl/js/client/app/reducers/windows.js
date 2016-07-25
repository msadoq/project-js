import {
  CHANGE_PAGE,
  ADD_WINDOW,
  DEL_WINDOW,
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

function window(state = {
  title: null,
  selectedTab: null,
  pages: [],
  geometry: {},
}, action) {
  switch (action.type) {
    case ADD_WINDOW:
      return Object.assign({}, state, {
        title: action.title,
        geometry: geometry(state.geometry, action)
      });
    case CHANGE_PAGE:
      return Object.assign({}, state, {
        selectedTab: action.pageId
      });
    default:
      return state;
  }
}

export default function windows(state = {}, action) {
  switch (action.type) {
    case CHANGE_PAGE:
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
