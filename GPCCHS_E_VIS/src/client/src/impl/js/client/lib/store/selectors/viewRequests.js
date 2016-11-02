import _get from 'lodash/get';

export function getViewRequests(state, viewId) {
  return _get(state, ['viewRequests', viewId]);
}
