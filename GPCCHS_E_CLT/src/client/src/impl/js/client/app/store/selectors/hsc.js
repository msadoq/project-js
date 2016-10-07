import _ from 'lodash';

/**
 * Selectors
 */
export function getStatus(state) {
  return _.get(state, 'hsc.status');
}
