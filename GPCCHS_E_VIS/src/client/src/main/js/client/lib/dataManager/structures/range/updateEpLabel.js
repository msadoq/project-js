import u from 'updeep';

export default function updateEpLabel(stateViewData, viewId, oldLabel, newLabel) {
  const viewData = stateViewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return stateViewData;
  }

  const newState = u({ [viewId]: {
    lines: u.omit(oldLabel),
    indexes: u.omit(oldLabel),
  } }, stateViewData);

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
    },
  };
}
