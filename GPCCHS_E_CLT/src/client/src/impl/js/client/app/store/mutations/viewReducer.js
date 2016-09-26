import _ from 'lodash';
import * as types from './types';
import external from '../../../external.main';

/**
 * Reducer
 */
export default function views(state = {}, action) {
  switch (action.type) {
    case types.WS_VIEW_CD_MOUNT:
    case types.WS_VIEW_CD_UNMOUNT:
      return Object.assign({}, state, {
        [action.payload.viewId]: view(state[action.payload.viewId], action)
      });
    case types.WS_VIEW_ADD:
      return {
        ...state,
        [action.payload.viewId]: view(undefined, action),
      };
    case types.WS_VIEW_REMOVE:
      return _.omit(state, [action.payload.viewId]);
    default:
      return state;
  }
}

const initialState = {
  title: 'Unknown',
  type: null,
};

function view(state = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_ADD:
      return Object.assign({}, state, {
        title: action.payload.title || state.title,
        type: action.payload.type || state.type,
        configuration: configuration(undefined, action),
      });
    default:
      return state;
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
