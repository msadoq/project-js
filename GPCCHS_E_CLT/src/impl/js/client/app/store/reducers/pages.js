import {
  ADD_PAGE,
  DEL_PAGE,
  OPEN_EDITOR,
  CLOSE_EDITOR,
  MOUNT_VIEW,
  UNMOUNT_VIEW,
} from '../actions/pages';
import _ from 'lodash';

function editor(state = {
  opened: false,
  viewId: null,
}, action) {
  switch (action.type) {
    case OPEN_EDITOR:
      return {
        opened: true,
        viewId: action.viewId,
      };
    case CLOSE_EDITOR:
      return {
        opened: false,
        viewId: null,
      };
    default:
      return state;
  }
}

function views(state = [], action) {
  switch (action.type) {
    case MOUNT_VIEW:
      return state.concat([action.viewId]);
    case UNMOUNT_VIEW:
      return state.filter(viewId => viewId !== action.viewId);
    default:
      return state;
  }
}

function page(state = {
  title: null,
  editor: {},
  views: [],
}, action) {
  switch (action.type) {
    case ADD_PAGE:
      return Object.assign({}, state, {
        title: action.title,
        editor: editor(state.editor, action),
      });
    case MOUNT_VIEW:
    case UNMOUNT_VIEW:
      return Object.assign({}, state, {
        views: views(state.views, action),
      });
    case OPEN_EDITOR:
    case CLOSE_EDITOR:
      return Object.assign({}, state, {
        editor: editor(state.editor, action),
      });
    default:
      return state;
  }
}

export default function pages(state = {}, action) {
  switch (action.type) {
    case ADD_PAGE:
      return {
        ...state,
        [action.pageId]: page(undefined, action),
      };
    case DEL_PAGE:
      return _.omit(state, [action.pageId]);
    case OPEN_EDITOR:
    case CLOSE_EDITOR:
    case MOUNT_VIEW:
    case UNMOUNT_VIEW:
      return {
        ...state,
        [action.pageId]: page(state[action.pageId], action),
      };
    default:
      return state;
  }
}
