// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add PlotView and DynamicView configurationReducer in viewManager
// VERSION : 1.1.2 : DM : #5828 : 04/04/2017 : Remove old configuration reducers from reducers/views/configuration
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Ported 1.1.0 patch to dev branch. EP Drag & drop auto-axis-creation.
// VERSION : 1.1.2 : DM : #5828 : 27/04/2017 : Fixed tests - auto axis creation when new EntryPoint.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : Plot axes log settings stored in store and documents.
// END-HISTORY
// ====================================================================

import __ from 'lodash/fp';

/*
 * All of this functions are used by the configuration reducer
*/

export function updateAxis(stateConf, action) {
  const { axis, axisId } = action.payload;
  if (!axis || !axisId) {
    return stateConf;
  }
  return __.set(`axes[${axisId}]`, { ...axis, id: axisId }, stateConf);
}

export function addAxis(stateConf, action) {
  const { axis } = action.payload;
  if (!axis || !axis.label) {
    return stateConf;
  }
  const axisId = axis.id || getUniqueAxisId(stateConf, axis.label);
  return __.set(`axes[${axisId}]`, { ...axis, id: axisId }, stateConf);
}

export function removeAxis(stateConf, action) {
  const { axisId } = action.payload;
  if (!axisId) {
    return stateConf;
  }
  return __.update('axes', __.omit(axisId), stateConf);
}

function getUniqueAxisId(stateConf, label) {
  const id = __.snakeCase(__.trim(__.deburr(label)));
  // check id isn't already defined
  let isUnique = false;
  let index = 1;
  let finalId = id;
  const { axes } = stateConf;
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

export function createAxis(stateConf, label, unit) {
  return {
    autoLimits: true,
    showTicks: true,
    autoTick: true,
    showAxis: true,
    showLabels: true,
    max: 300,
    min: -300,
    logarithmic: false,
    logSettings: {
      min: 0.1,
      max: 1000000000,
      base: 10,
    },
    label,
    unit,
    id: getUniqueAxisId(stateConf, label),
  };
}

// This is not a reducer because it returns pair of axes
export const getYAxis = (stateConf, action) => {
  const { entryPoint } = action.payload;
  const { connectedData } = entryPoint;
  const { axes } = stateConf;
  const axisYKey = Object.keys(axes).find(k => axes[k].id && axes[k].id === connectedData.axisId);
  const axisY = axisYKey ? axes[axisYKey] : null;
  const finalY = axisY || createAxis(stateConf, entryPoint.name, connectedData.unit);
  const prefixY = finalY.id === 'time' ? 'Y:' : '';

  return { ...finalY, id: `${prefixY}${finalY.id}` };
};
