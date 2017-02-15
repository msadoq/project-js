import __ from 'lodash/fp';

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
    label,
    unit,
    id: getUniqueAxisId(stateConf, label),
  };
}

export const getAxes = (stateConf, action) => {
  const { entryPoint } = action.payload;
  const { axes } = stateConf;
  const { connectedDataX, connectedDataY } = entryPoint;

  const axisX = __.find(axis => axis.unit === connectedDataX.unit, axes);
  const axisY = __.find(axis => axis.unit === connectedDataY.unit, axes);
  const finalX = axisX || createAxis(stateConf, entryPoint.name, connectedDataX.unit);
  const finalY = axisY || createAxis(stateConf, entryPoint.name, connectedDataY.unit);
  const prefixX = finalX.id === finalY.id ? 'X:' : '';
  const prefixY = finalX.id === finalY.id ? 'Y:' : '';
  return [
    { ...finalX, id: `${prefixX}${finalX.id}` },
    { ...finalY, id: `${prefixY}${finalY.id}` },
  ];
};
