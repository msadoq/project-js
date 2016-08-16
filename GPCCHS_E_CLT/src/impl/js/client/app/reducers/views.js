import {
  ADD_VIEW,
  DEL_VIEW,
  SWITCH_SUB_VISIBILITY,
  WAIT_SUB,
  ADD_SUB,
} from '../actions/views';
import _ from 'lodash';

function view(state = {
  title: null,
  type: 'plot', // plot, text, mimic
  content: null,
  subscriptions: [],
  visible: [],
  waiting: false,
}, action) {
  switch (action.type) {
    case ADD_VIEW:
      return Object.assign({}, state, {
        title: action.title,
      });
    case ADD_SUB:
      return Object.assign({}, state, {
        subscriptions: [...state.subscriptions, action.subscriptionId],
      });
    case SWITCH_SUB_VISIBILITY:
      if (state.visible.includes(action.subscriptionId)) {
        return Object.assign({}, state, { visible: _.pull(state.visible, action.subscriptionId) });
      } else {
        return Object.assign({}, state, { visible: [...state.visible, action.subscriptionId] });
      }
    case WAIT_SUB:
      return Object.assign({}, state, { waiting: action.waiting });
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
    case SWITCH_SUB_VISIBILITY:
    case WAIT_SUB:
    case ADD_SUB:
      return {
        ...state,
        [action.viewId]: view(state[action.viewId], action),
      };
    default:
      return state;
  }
}
