/* eslint import/prefer-default-export:0 */
import _get from 'lodash/get';

export function getViewData(state, viewId) {
  return _get(state, ['viewData', viewId]);
}
