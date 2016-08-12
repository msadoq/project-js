import {
  WAIT_SUB,
  ADD_SUB,
} from '../actions/subscriptions';

export default function subscriptions(state = {}, action) {
  switch (action.type) {
    case ADD_SUB:
      return {
        ...state,
        [action.subscriptionId]: action.subscription,
      };
    case WAIT_SUB:
      {
        const increment = action.waiting ? 1 : -1;
        return {
          ...state,
          waiting: state.waiting + increment,
        };
      }
    default:
      return state;
  }
}
