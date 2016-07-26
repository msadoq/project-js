export const ADD_POINTS = 'ADD_POINTS';

export function addPoints(subscriptionId, points) {
  return {
    type: ADD_POINTS,
    subscriptionId,
    points,
  };
}
