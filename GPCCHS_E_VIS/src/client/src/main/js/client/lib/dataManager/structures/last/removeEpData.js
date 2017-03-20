// import u from 'updeep';
import _omit from 'lodash/omit';

export default function removeEpData(stateViewData, viewId, epName) {
  if (!stateViewData[viewId]) {
    return stateViewData;
  }
  if (!stateViewData[viewId].index[epName]) {
    return stateViewData;
  }

  // return u({ [viewId]: {
  //   index: u.omit(epName),
  //   values: u.omit(epName),
  // } }, stateViewData);
  return { ...stateViewData,
    [viewId]: {
      ...stateViewData[viewId],
      index: _omit(stateViewData[viewId].index, epName),
      values: _omit(stateViewData[viewId].values, epName),
    },
  };
}
