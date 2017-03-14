import u from 'updeep';

export default function removeEpData(stateViewData, viewId, epName) {
  const currentViewData = stateViewData[viewId];
  if (!currentViewData) {
    return stateViewData;
  }
  // remove ep line
  if (!currentViewData.lines[epName]) {
    return stateViewData;
  }

  return u({ [viewId]: {
    indexes: u.omit(epName),
    lines: u.omit(epName),
  } }, stateViewData);
}
