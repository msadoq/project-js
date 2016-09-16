import * as types from './types';
import _ from 'lodash';

/**
 * Reducer
 */
export default function hsc(state = { status: 'not-started' }, action) {
  switch (action.type) {
    case types.HSC_UPDATE_STATUS:
      return Object.assign({}, { status: action.payload.status });
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getStatus(state) {
  return _.get(state, 'hsc.status');
}
