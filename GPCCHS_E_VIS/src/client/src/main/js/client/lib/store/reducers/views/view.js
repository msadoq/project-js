import __ from 'lodash/fp';

import composeReducers from '../../composeReducers';
import * as types from '../../types';
import vivl from '../../../../VIVL/main';

import { commonConfiguration, configurationByViewType, configurationByStructureType } from './configuration';

const viewIsModified = (stateView, action) => {
  const setIsModified = __.set('isModified');
  const isModified = action.payload && action.payload.isModified;

  if (!stateView) {
    return stateView;
  }
  if (__.isBoolean(isModified)) {
    return setIsModified(isModified, stateView);
  }

  const shouldSetModifiedToFalse = __.contains(__, [
    types.WS_VIEW_RELOAD,
  ]);
  const shouldSetModifiedToTrue = __.contains(__, [
    types.WS_VIEW_ADD,
    types.WS_VIEW_UPDATEPATH,
    types.WS_VIEW_UPDATE_ABSOLUTEPATH,
    types.WS_VIEW_SET_OID,
    types.WS_VIEW_SETMODIFIED,
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
    types.WS_VIEW_ADD_LINK,
    types.WS_VIEW_REMOVE_LINK,
    types.WS_VIEW_ADD_MARKER,
    types.WS_VIEW_REMOVE_MARKER,
    types.WS_VIEW_ADD_PROCEDURE,
    types.WS_VIEW_REMOVE_PROCEDURE,
    types.WS_VIEW_SETCOLLAPSED,
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

function simpleView(stateView = initialState, action) {
  switch (action.type) {
    case types.WS_VIEW_REMOVE:
      return undefined;
    case types.WS_VIEW_ADD:
      return {
        ...stateView,
        type: action.payload.type || stateView.type,
        path: action.payload.path,
        oId: action.payload.oId,
        absolutePath: action.payload.absolutePath,
      };
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

const viewConfiguration = (stateView, action) => {
  if (!stateView) {
    return stateView;
  }
  const viewType = stateView.type;
  const structureType = viewType ? vivl(viewType, 'structureType')() : '';
  const configuration = composeReducers(
    configurationByStructureType[structureType] || __.identity,
    configurationByViewType[viewType] || __.identity,
    commonConfiguration
  );
  return __.set('configuration', configuration(stateView.configuration, action), stateView);
};

export default composeReducers(viewConfiguration, viewIsModified, simpleView);
