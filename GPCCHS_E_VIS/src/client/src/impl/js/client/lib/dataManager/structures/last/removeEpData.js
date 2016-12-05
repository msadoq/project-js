import u from 'updeep';

export default function removeEpData(state, viewId, epName) {
  if (!state.viewData[viewId]) {
    return state;
  }

  return u({ viewData: {
    [viewId]: {
      index: u.omit(epName),
      values: u.omit(epName)
    } } }, state);
}
