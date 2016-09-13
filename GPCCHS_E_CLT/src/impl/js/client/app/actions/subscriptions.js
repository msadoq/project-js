export const WAIT_SUB = 'WAIT_SUB';
export const ADD_SUB = 'ADD_SUB';

export function addView(subscriptionId, subscription) {
  return {
    type: ADD_SUB,
    subscriptionId,
    subscription,
  };
}

export function waitSub(waiting) {
  return {
    type: WAIT_SUB,
    waiting,
  };
}
