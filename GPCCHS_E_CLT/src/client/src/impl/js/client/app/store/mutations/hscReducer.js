import _ from 'lodash';
import * as constants from '../../constants';
import * as types from '../types';

/**
 * Reducer
 */
export default function hsc(stateHsc = { status: constants.LIFECYCLE_NOT_STARTED }, action) {
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
