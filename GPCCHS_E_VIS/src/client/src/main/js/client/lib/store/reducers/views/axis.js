import _trim from 'lodash/trim';
import _deburr from 'lodash/deburr';
import _snakeCase from 'lodash/snakeCase';
import _find from 'lodash/find';
import update from 'lodash/fp/update';
import prop from 'lodash/fp/prop';
import path from 'lodash/fp/path';
import pipe from 'lodash/fp/pipe';
import equals from 'lodash/fp/equals';
import u from 'updeep';

const isPlotView = pipe(prop('type'), equals('PlotView'));

export function updateAxis(stateViews, action) {
  const { viewId, axis, axisId } = action.payload;
  const currentView = stateViews[viewId];
  if (!isPlotView(currentView) || !axis || !axisId) {
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
  const currentView = stateViews[viewId];
  if (!isPlotView(currentView)) {
    return stateViews;
  }
  if (!axis || !axis.label) {
    return stateViews;
  }
  const axisId = axis.id || getUniqueAxisId(currentView, axis.label);
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
  const { viewId, axisId } = action.payload;
  // Content only for a type of view if viewType is defined
  if (!axisId || !isPlotView(stateViews[viewId])) {
    return stateViews;
  }
  const axisExists = () => path([viewId, 'configuration', 'axes', axisId])(stateViews);
  return u({
    [viewId]: {
      isModified: u.if(axisExists, () => true),
      configuration: {
        axes: u.omit(axisId),
      },
    },
  }, stateViews);
}

function getUniqueAxisId(stateView, label) {
  const id = _snakeCase(_trim(_deburr(label)));
  // check id isn't already defined
  let isUnique = false;
  let index = 1;
  let finalId = id;
  const { axes } = stateView.configuration;
  while (!isUnique) {
    if (!axes[finalId]) {
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
