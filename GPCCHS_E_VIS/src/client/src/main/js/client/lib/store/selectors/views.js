import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import __ from 'lodash/fp';
import { compile } from '../../common/operators';
import { getPerViewData } from '../../dataManager/map';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  __.isEqual
);

export const getViews =
  __.prop('views');

export const getView =
  (state, { viewId }) =>
    __.prop(viewId, getViews(state));

export const getEntryPointOnAxis = (state, { viewId, axisId }) => {
  const epOnAxis = [];
  if (!state.views[viewId] || !state.views[viewId].configuration.axes[axisId]) {
    return epOnAxis;
  }
  state.views[viewId].configuration.entryPoints.forEach((ep) => {
    if (ep.connectedDataX.axisId === axisId || ep.connectedDataY.axisId === axisId) {
      epOnAxis.push(ep.name);
    }
  });
  return epOnAxis;
};

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewConfiguration = createSelector(
  getView,
  __.prop('configuration')
);

export const getViewContent = createSelector(
  getViewConfiguration,
  __.prop('content')
);

export const getViewEntryPoints = (state, { viewId }) => {
  const props = getPerViewData(state, { viewId });
  return props.entryPoints;
};

export const getViewEntryPoint = (state, { viewId, epName }) =>
  Object.assign({}, getViewEntryPoints(state, { viewId })[epName], { name: epName });

export const getViewEntryPointStateColors = createSelector(
  getViewEntryPoint,
  ep => ep.stateColors || []
);

const _getEntryPoint = (epName, entryPoints) => entryPoints.find(ep => ep.name === epName);

export const _getEntryPointColorObj = ({ entryPoints, epName, value, dataProp }) => {
  const stateColor = __.propOr([], 'stateColors', _getEntryPoint(epName, entryPoints))
    .filter(c =>
      (new RegExp(`${__.pathOr('', ['condition', 'field'], c)}$`, 'g'))
        .test(__.pathOr('', [dataProp, 'formula'], _getEntryPoint(epName, entryPoints))))
    .find(c => compile(c.condition)(value));
  if (__.prop('color', stateColor)) {
    return {
      color: __.prop('color', stateColor),
    };
  }
  return undefined;
};
