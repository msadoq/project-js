import _trim from 'lodash/trim';
import _deburr from 'lodash/deburr';
import _snakeCase from 'lodash/snakeCase';
import _find from 'lodash/find';
import u from 'updeep';

export function updateAxis(stateViews, action) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[action.payload.viewId].type !== 'PlotView') {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: { [action.payload.axisId]: action.payload.axis },
      },
      isModified: true,
    },
  }, stateViews);
}

export function addAxis(stateViews, action) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[action.payload.viewId].type !== 'PlotView') {
    return stateViews;
  }
  if (!action.payload.axis.label) {
    return stateViews;
  }
  let id = action.payload.axis.id;
  let axis;
  if (!id) {
    id = getUniqueAxisId(stateViews[action.payload.viewId], action.payload.axis.label);
    axis = Object.assign({}, action.payload.axis, { id });
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: { [id]: axis || action.payload.axis },
      },
      isModified: true,
    },
  }, stateViews);
}

export function removeAxis(stateViews, action) {
  if (!stateViews[action.payload.viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[action.payload.viewId].type !== 'PlotView') {
    return stateViews;
  }
  return u({
    [action.payload.viewId]: {
      configuration: {
        axes: u.omit(action.payload.axisId),
      },
      isModified: true,
    },
  }, stateViews);
}

export function getUniqueAxisId(stateView, label) {
  const id = _snakeCase(_trim(_deburr(label)));
  // check id isn't already defined
  let isUnique = false;
  let index = 1;
  let finalId = id;
  const axes = Object.keys(stateView.configuration.axes);
  while (!isUnique) {
    if (axes.indexOf(finalId) === -1) {
      isUnique = true;
    } else {
      finalId = id.concat('_', index);
      index += 1;
    }
  }
  return finalId;
}

export function createAxis(stateView, label, unit) {
  return {
    label,
    unit,
    id: getUniqueAxisId(stateView, label),
  };
}

export function addNewAxis(state, viewId, axis) {
  if (axis) {
    const val = { [axis.id]: axis };
    return u({ [viewId]: {
      configuration: {
        axes: val,
      } } }, state);
  }
  return state;
}

export function getAxisId(epName, connectedData, currentView) {
  if (connectedData.axisId) {
    return connectedData.axisId;
  }
  // Choose the axis with the right unit
  const index = _find(currentView.configuration.axes,
                      current => current.unit === connectedData.unit);
  if (index) {
    return index.id;
  }
}
