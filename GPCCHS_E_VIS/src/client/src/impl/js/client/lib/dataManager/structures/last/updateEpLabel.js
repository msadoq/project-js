import u from 'updeep';

export default function updateEpLabel(state, viewId, oldLabel, newLabel) {
  const viewData = state.viewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return state;
  }
  const oldIndex = viewData.index[oldLabel];
  const oldValue = viewData.values[oldLabel];
  // remove oldLabel from state
  const newState = u({
    viewData: {
      [viewId]: {
        index: u.omit(oldLabel),
        values: u.omit(oldLabel)
      } } }, state);
  // add newLabel in state
  return { ...newState,
    viewData: {
      ...newState.viewData,
      [viewId]: {
        index: {
          ...newState.viewData[viewId].index,
          [newLabel]: oldIndex,
        },
        values: {
          ...newState.viewData[viewId].values,
          [newLabel]: oldValue,
        }
      } } };
}
