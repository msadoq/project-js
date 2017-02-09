import _trim from 'lodash/trim';
import _deburr from 'lodash/deburr';
import _snakeCase from 'lodash/snakeCase';
import _find from 'lodash/find';
import update from 'lodash/fp/update';
import u from 'updeep';

export function updateAxis(stateViews, action) {
  const { viewId, axis, axisId } = action.payload;
  if (!stateViews[viewId] || !axis || !axisId) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[viewId].type !== 'PlotView') {
    return stateViews;
  }
  return u({
    [viewId]: {
      configuration: {
        axes: { [axisId]: axis },
      },
      isModified: true,
    },
  }, stateViews);
}

export function addAxis(stateViews, action) {
  const { viewId, axis } = action.payload;
  if (!stateViews[viewId]) {
    return stateViews;
  }
  // Content only for a type of view if viewType is defined
  if (stateViews[viewId].type !== 'PlotView') {
    return stateViews;
  }
  if (!action.payload.axis.label) {
    return stateViews;
  }
  const axisId = axis.id || getUniqueAxisId(stateViews[viewId], axis.label);
  return u({
    [viewId]: {
      configuration: {
        axes: { [axisId]: update('id', () => axisId, axis) },
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

function getUniqueAxisId(stateView, label) {
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

function createAxis(stateView, label, unit) {
  return {
    label,
    unit,
    id: getUniqueAxisId(stateView, label),
  };
}

export const getAxes = (entryPoint, currentView) => {
  const { axes } = currentView.configuration;
  const { connectedDataX, connectedDataY } = entryPoint;
  const axisX = _find(axes, axis => axis.unit === connectedDataX.unit);
  const axisY = _find(axes, axis => axis.unit === connectedDataY.unit);
  return [
    axisX || createAxis(currentView, entryPoint.name, connectedDataX.unit),
    axisY || createAxis(currentView, entryPoint.name, connectedDataY.unit),
  ];
};
