import _ from 'lodash/fp';

import composeReducers from '../../composeReducers';
import * as types from '../../types';

import createConfiguration from './configuration';

const setIsModified = _.set('isModified');
const getIsModified = (action) => {
  if (action.type === types.WS_VIEW_SETMODIFIED) {
    return _.get('payload.flag', action);
  }
  return _.get('payload.isModified', action);
};

// This reducer take care of action types and update the isModified property
// this is a temporary fix, waiting for the savableMiddleware
const viewIsModified = (stateView, action) => {
  const isModified = getIsModified(action);
  if (_.isBoolean(isModified)) {
    return setIsModified(isModified, stateView);
  }

  const shouldSetModifiedToFalse = _.contains(_, [
    types.WS_VIEW_RELOAD,
  ]);
  const shouldSetModifiedToTrue = _.contains(_, [
    types.WS_VIEW_UPDATEPATH,
    types.WS_VIEW_UPDATE_ABSOLUTEPATH,
    types.WS_VIEW_SET_OID,
    types.WS_VIEW_UPDATE_RATIO,
    types.WS_VIEW_UPDATE_TITLE,
    types.WS_VIEW_UPDATE_GRID,
    types.WS_VIEW_UPDATE_LINK,
    types.WS_VIEW_UPDATE_MARKER,
    types.WS_VIEW_UPDATE_PROCEDURE,
    types.WS_VIEW_UPDATE_TITLESTYLE,
    types.WS_VIEW_UPDATE_BGCOLOR,
    types.WS_VIEW_UPDATE_LEGEND,
    types.WS_VIEW_UPDATE_CONTENT,
    types.WS_VIEW_UPDATE_SHOWYAXES,
    types.WS_VIEW_UPDATE_ENTRYPOINT,
    types.WS_VIEW_UPDATE_AXIS,
    types.WS_VIEW_ADD_LINK,
    types.WS_VIEW_REMOVE_LINK,
    types.WS_VIEW_ADD_MARKER,
    types.WS_VIEW_REMOVE_MARKER,
    types.WS_VIEW_ADD_PROCEDURE,
    types.WS_VIEW_REMOVE_PROCEDURE,
    types.WS_VIEW_ADD_ENTRYPOINT,
  ]);
  if (shouldSetModifiedToTrue(action.type)) {
    return setIsModified(true, stateView);
  } else if (shouldSetModifiedToFalse(action.type)) {
    return setIsModified(false, stateView);
  }
  return stateView;
};

const initialState = {
  type: null,
  isModified: true,
};

// This reducer deal with simple views
function simpleView(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_RELOAD:
    case types.WS_VIEW_ADD_BLANK:
    case types.WS_LOAD_DOCUMENTS: {
      const newView = _.omit(['windowState', 'geometry', 'pageUuid', 'hideBorders'], action.payload.view);
      return _.defaults(initialState, newView);
    }
    case types.WS_VIEW_UPDATEPATH:
      return {
        ...stateView,
        path: action.payload.newPath,
      };
    case types.WS_VIEW_UPDATE_ABSOLUTEPATH:
      return {
        ...stateView,
        absolutePath: action.payload.newPath,
      };
    case types.WS_VIEW_SET_OID:
      return {
        ...stateView,
        oId: action.payload.oid,
      };
    default:
      return stateView;
  }
}

// This reducer take care of the '.configuration' property of a view
const viewConfiguration = (stateView, action) => {
  const configuration = createConfiguration(stateView.type);
  return _.set('configuration', configuration(stateView.configuration, action), stateView);
};

// expose a single reducer that deal with one view
export default composeReducers(viewConfiguration, viewIsModified, simpleView);
