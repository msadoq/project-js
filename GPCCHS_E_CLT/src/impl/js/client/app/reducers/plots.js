import { PLOT_ADD_POINTS } from '../actions/plots';

function points(state = {}, action) {
  switch (action.type) {
    case PLOT_ADD_POINTS: {
      const newPoints = {};
      action.points.forEach(p => {
        const x = p[0];
        const y = p[1];
        newPoints[x] = typeof state[x] !== 'undefined'
          ? Object.assign({}, state[x], { [action.plotId]: y })
          : { [action.plotId]: y };
      });
      return Object.assign({}, state, newPoints);
    }
    default:
      return state;
  }
}

function plot(state = {
  points: {},
}, action) {
  switch (action.type) {
    case PLOT_ADD_POINTS:
      return Object.assign({}, state, {
        points: points(state.points, action),
      });
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
