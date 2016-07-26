import { ADD_POINTS } from '../actions/subscriptions';

function subscription(state = {
  points: [],
}, action) {
  switch (action.type) {
    case ADD_POINTS:
      return Object.assign({}, state, {
        points: Array.concat(state.points, action.points),
      });
    default:
      return state;
  }
}

export default function subscriptions(state = {}, action) {
  switch (action.type) {
    case ADD_POINTS:
      return Object.assign({}, state, {
        [action.subscriptionId]: subscription(state[action.subscriptionId], action),
      });
    default:
      return state;
  }
}
