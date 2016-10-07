import _ from 'lodash';
import * as types from '../types';
import external from '../../../external.main';

/**
 * Reducer
 */
export default function views(stateViews = {}, action) {
  switch (action.type) {
    case types.WS_VIEW_CD_MOUNT:
    case types.WS_VIEW_CD_UNMOUNT:
      return Object.assign({}, stateViews, {
        [action.payload.viewId]: view(stateViews[action.payload.viewId], action)
      });
    case types.WS_VIEW_ADD:
      return {
        ...stateViews,
        [action.payload.viewId]: view(undefined, action),
      };
    case types.WS_VIEW_REMOVE:
      return _.omit(stateViews, [action.payload.viewId]);
    default:
      return stateViews;
  }
}

const initialState = {
  title: 'Unknown',
  type: null,
};

function view(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, stateView, {
        title: action.payload.title || stateView.title,
        type: action.payload.type || stateView.type,
        configuration: configuration(undefined, action),
      });
    default:
      return stateView;
  }
}

// TODO remove and add configuration entry point
function configuration(state = {}, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, action.payload.configuration || state);
    // case types.WS_VIEW_CD_MOUNT:
    //   return Object.assign({}, state, {
    //     connectedData: [...state.connectedData, action.payload.connectedDataId], // TODO remove and add configuration entry point
    //   });
    // case types.WS_VIEW_CD_UNMOUNT:
    //   return Object.assign({}, state, {
    //     connectedData: _.without(state.connectedData, action.payload.connectedDataId), // TODO remove and add configuration entry point
    //   });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getView(state, viewId) {
  return state.views[viewId];
}

export function getConnectedData(state, viewId) { // TODO test
  const view = getView(state, viewId);
  if (!view) {
    return [];
  }
  const selector = _.get(external, `${view.type}.getConnectedDataFromState`);
  if (!_.isFunction(selector)) {
    return [];
  }
  return selector(state, viewId);
}
