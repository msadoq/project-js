import _ from 'lodash';
import * as types from './types';

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

// TODO TEST all exit cases
export function getConnectedData(state, viewId) {
  const view = _.get(state, `views.${viewId}`);
  if (!viewId || !view) {
    return [];
  }

  // TODO external abstraction
  const epIds = [];
  if (view.type === 'PlotView') {
    // type : PlotView : configuration.plotViewEntryPoints[{connectedDataX.uuid, connectedDataY.uuid}]
    _.each(_.get(view, 'configuration.plotViewEntryPoints'), ep => {
      epIds.push(_.get(ep, 'connectedDataX.uuid'));
      epIds.push(_.get(ep, 'connectedDataY.uuid'));
    });
  } else if (view.type === 'TextView') {
    // type : TextView : configuration.textViewEntryPoints[{connectedData.uuid}]
    _.each(_.get(view, 'configuration.textViewEntryPoints'), ep => {
      epIds.push(_.get(ep, 'connectedData.uuid'));
    });
  }

  if (!epIds.length) {
    return [];
  }

  return _.reduce(epIds, (connectedData, id) => {
    const ep = state.connectedData[id];
    if (!ep) {
      return connectedData;
    }

    return [...connectedData, Object.assign({ connectedDataId: id }, ep)];
  }, []);
}
