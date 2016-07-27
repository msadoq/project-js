import {
  ADD_VIEW,
  DEL_VIEW,
} from '../actions/views';
import _ from 'lodash';

function view(state = {
  title: null,
  type: 'plot', // plot, text, mimic
  content: null,
  subscriptions: [],
}, action) {
  switch (action.type) {
    case ADD_VIEW:
      return Object.assign({}, state, {
        title: action.title,
      });
    default:
      return state;
  }
}

export default function views(state = {}, action) {
  switch (action.type) {
    case ADD_VIEW:
      return {
        ...state,
        [action.viewId]: view(undefined, action),
      };
    case DEL_VIEW:
      return _.omit(state, [action.viewId]);
    default:
      return state;
  }
}
