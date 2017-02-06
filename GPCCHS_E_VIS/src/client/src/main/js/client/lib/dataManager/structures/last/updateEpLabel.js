import u from 'updeep';

export default function updateEpLabel(stateViewData, viewId, oldLabel, newLabel) {
  const viewData = stateViewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return stateViewData;
  }
  const oldIndex = viewData.index[oldLabel];
  const oldValue = viewData.values[oldLabel];
  // remove oldLabel from state
  const newState = u({ [viewId]: {
    index: u.omit(oldLabel),
    values: u.omit(oldLabel),
  } }, stateViewData);
  // add newLabel in state
  return u({ [viewId]: { index: { [newLabel]: oldIndex }, values: { [newLabel]: oldValue } } },
    newState);
}
