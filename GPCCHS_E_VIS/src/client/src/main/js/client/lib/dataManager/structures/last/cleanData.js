// import u from 'updeep';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

export default function cleanData(viewDataState, viewId, epName, expectedInterval) {
  const currentTime = _get(viewDataState, [viewId, 'index', epName]);
  if (!currentTime) {
    return viewDataState;
  }
  if (currentTime >= expectedInterval[0] && currentTime <= expectedInterval[1]) {
    return viewDataState;
  }
  // return u({ [viewId]: {
  //   index: u.omit(epName),
  //   values: u.omit(epName),
  // } }, viewDataState);
  return { ...viewDataState,
    [viewId]: {
      ...viewDataState[viewId],
      index: _omit(viewDataState[viewId].index, epName),
      values: _omit(viewDataState[viewId].values, epName),
    },
  };
}
