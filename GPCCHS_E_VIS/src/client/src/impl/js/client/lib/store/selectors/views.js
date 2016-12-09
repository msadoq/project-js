import _filter from 'lodash/filter';

export const getViews = state => state.views;

export const getView = (state, viewId) => state.views[viewId];

export const getEntryPointOnAxis = (state, viewId, axisId) => {
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

export function getModifiedViewsIds(state) {
  return _filter(Object.keys(state.views), vId => state.views[vId].isModified);
}
