import u from 'updeep';
import _get from 'lodash/get';

export default function cleanData(state, viewId, epName, expectedInterval) {
  const currentTime = _get(state, ['viewData', viewId, 'index', epName]);
  if (!currentTime) {
    return state;
  }
  if (currentTime >= expectedInterval[0] && currentTime <= expectedInterval[1]) {
    return state;
  }
  return u({ viewData: {
    [viewId]: {
      index: u.omit(epName),
      values: u.omit(epName),
    } } }, state);
}
