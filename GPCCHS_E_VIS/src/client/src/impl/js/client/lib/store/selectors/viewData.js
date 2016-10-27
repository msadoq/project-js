import _get from 'lodash/get';

export function getViewData(state, viewId) {
  return _get(state, ['viewData', viewId]);
}
