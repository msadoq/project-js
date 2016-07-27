import { PLOT_ADD_POINTS } from '../actions/plots';
import { OrderedMap } from 'immutable';

function points(state = new OrderedMap({}), action) {
  switch (action.type) {
    case PLOT_ADD_POINTS: {
      // TODO : handle sort order (x ASC)
      return action.points.reduce((currentState, p) => {
        const x = p[0];
        const y = p[1];
        // return currentState
        //   .setIn([x, 'x'], x)
        //   .setIn([x, action.subscriptionId], y);
        const machin = currentState
          .setIn([x, 'x'], x)
          .setIn([x, action.subscriptionId], y);
        console.log(machin, machin.toArray, OrderedMap.isOrderedMap(machin));
        return machin;
      }, state);
    }
    default:
      return state;
  }
}

function plot(state = {
  points: new OrderedMap(),
}, action) {
  switch (action.type) {
    case PLOT_ADD_POINTS:
      return {
        points: points(state.points, action),
      };
    default:
      return state;
  }
}

export default function plots(state = {}, action) {
  switch (action.type) {
    case PLOT_ADD_POINTS:
      return Object.assign({}, state, {
        [action.plotId]: plot(state[action.plotId], action),
      });
    default:
      return state;
  }
}
