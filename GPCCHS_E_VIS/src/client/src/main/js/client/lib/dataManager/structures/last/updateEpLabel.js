// import u from 'updeep';
import _omit from 'lodash/omit';

export default function updateEpLabel(stateViewData, viewId, oldLabel, newLabel) {
  const viewData = stateViewData[viewId];
  if (!oldLabel || !newLabel || oldLabel === newLabel || !viewData) {
    return stateViewData;
  }
  const oldIndex = viewData.index[oldLabel];
  const oldValue = viewData.values[oldLabel];
  // remove oldLabel from state
  // const newState = u({ [viewId]: {
  //   index: u.omit(oldLabel),
  //   values: u.omit(oldLabel),
  // } }, stateViewData);
  const newState = { ...stateViewData,
    [viewId]: {
      ...stateViewData[viewId],
      index: _omit(stateViewData[viewId].index, oldLabel),
      values: _omit(stateViewData[viewId].values, oldLabel),
    },
  };
  // add newLabel in state
  // return u({ [viewId]: { index: { [newLabel]: oldIndex }, values: { [newLabel]: oldValue } } },
  //   newState);
  return { ...newState,
    [viewId]: {
      ...newState[viewId],
      index: {
        ...newState[viewId].index,
        [newLabel]: oldIndex,
      },
      values: {
        ...newState[viewId].values,
        [newLabel]: oldValue,
      },
    },
  };
}
