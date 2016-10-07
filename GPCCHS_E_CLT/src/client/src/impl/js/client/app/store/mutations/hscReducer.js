import _ from 'lodash';
import * as types from '../types';

/**
 * Reducer
 */
export default function hsc(stateHsc = { status: 'not-started' }, action) {
  switch (action.type) {
    case types.HSC_UPDATE_STATUS:
      return Object.assign({}, { status: action.payload.status });
    default:
      return stateHsc;
  }
}

/**
 * Selectors
 */
export function getStatus(state) {
  return _.get(state, 'hsc.status');
}
