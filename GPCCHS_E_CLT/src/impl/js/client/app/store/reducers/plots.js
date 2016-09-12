// import { PLOT_ADD_POINTS } from '../actions/plots';
//
// function points(state = {}, action) {
//   switch (action.type) {
//     case PLOT_ADD_POINTS: {
//       return action.points.reduce((currentState, p) => {
//         const x = p[0];
//         const y = p[1];
//         return Object.assign({}, currentState, {
//           [x]: (!currentState[x])
//             ? { x, [action.subscriptionId]: y }
//             : Object.assign({}, currentState[x], { [action.subscriptionId]: y }),
//         });
//       }, state);
//     }
//     default:
//       return state;
//   }
// }
//
// function plot(state = {
//   points: {},
// }, action) {
//   switch (action.type) {
//     case PLOT_ADD_POINTS:
//       return {
//         points: points(state.points, action),
//       };
//     default:
//       return state;
//   }
// }
//
// export default function plots(state = {}, action) {
//   switch (action.type) {
//     case PLOT_ADD_POINTS:
//       return Object.assign({}, state, {
//         [action.plotId]: plot(state[action.plotId], action),
//       });
//     default:
//       return state;
//   }
// }
