// import u from 'updeep';
import _omit from 'lodash/omit';

export default function updateEpLabel(stateViewData, viewId, oldLabel, newLabel) {
  const viewData = stateViewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return stateViewData;
  }

  // const newState = u({ [viewId]: {
  //   lines: u.omit(oldLabel),
  //   indexes: u.omit(oldLabel),
  // } }, stateViewData);
  const newState = { ...stateViewData,
    [viewId]: {
      ...stateViewData[viewId],
      indexes: _omit(stateViewData[viewId].indexes, oldLabel),
      lines: _omit(stateViewData[viewId].lines, oldLabel),
    },
  };
  return { ...newState,
    [viewId]: {
      ...newState[viewId],
      lines: {
        ...newState[viewId].lines,
        [newLabel]: stateViewData[viewId].lines[oldLabel],
      },
      indexes: {
        ...newState[viewId].indexes,
        [newLabel]: stateViewData[viewId].indexes[oldLabel],
      },
      min: { ...newState.min, [newLabel]: stateViewData[viewId].min[oldLabel] },
      max: { ...newState.max, [newLabel]: stateViewData[viewId].max[oldLabel] },
      minTime: { ...newState.minTime, [newLabel]: stateViewData[viewId].minTime[oldLabel] },
      maxTime: { ...newState.maxTime, [newLabel]: stateViewData[viewId].maxTime[oldLabel] },
    },
  };
}
