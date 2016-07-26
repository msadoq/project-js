import { UPDATE_CONTENT } from '../actions/views';

function view(state = {
  title: null,
  type: 'plot', // plot, text, mimic
  content: null,
  subscriptions: [],
}, action) {
  switch (action.type) {
    case UPDATE_CONTENT:
      return Object.assign({}, state, {
        content: action.content,
      });
    default:
      return state;
  }
}

export default function views(state = {}, action) {
  switch (action.type) {
    case UPDATE_CONTENT:
      return Object.assign({}, state, {
        [action.viewId]: view(state[action.viewId], action),
      });
    default:
      return state;
  }
}
