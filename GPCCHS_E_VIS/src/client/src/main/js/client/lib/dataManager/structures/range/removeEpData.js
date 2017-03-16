// import u from 'updeep';
import _omit from 'lodash/omit';

export default function removeEpData(stateViewData, viewId, epName) {
  const currentViewData = stateViewData[viewId];
  if (!currentViewData) {
    return stateViewData;
  }
  // remove ep line
  if (!currentViewData.lines[epName]) {
    return stateViewData;
  }

  // return u({ [viewId]: {
  //   indexes: u.omit(epName),
  //   lines: u.omit(epName),
  // } }, stateViewData);
  return { ...stateViewData,
    [viewId]: {
      ...stateViewData[viewId],
      indexes: _omit(stateViewData[viewId].indexes, epName),
      lines: _omit(stateViewData[viewId].lines, epName),
    },
  };
}
