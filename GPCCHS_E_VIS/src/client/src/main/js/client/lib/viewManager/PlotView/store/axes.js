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

function createAxis(stateConf, label, unit) {
  return {
    autoLimits: true,
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
