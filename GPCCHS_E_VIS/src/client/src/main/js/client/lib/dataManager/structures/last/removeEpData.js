import u from 'updeep';

export default function removeEpData(stateViewData, viewId, epName) {
  if (!stateViewData[viewId]) {
    return stateViewData;
  }
  if (!stateViewData[viewId].index[epName]) {
    return stateViewData;
  }

  return u({ [viewId]: {
    index: u.omit(epName),
    values: u.omit(epName),
  } }, stateViewData);
}
