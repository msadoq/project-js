// import _ from 'lodash'
// import external from '../../../external.main';

/**
 * Selectors
 */
export function getView(state, viewId) {
  return state.views[viewId];
}

// export function getConnectedData(state, viewId) { // TODO test
//   const view = getView(state, viewId);
//   if (!view) {
//     return [];
//   }
//   const selector = _.get(external, `${view.type}.getConnectedDataFromState`);
//   if (!_.isFunction(selector)) {
//     return [];
//   }
//   return selector(state, viewId);
// }
