import * as types from './types';
import _ from 'lodash';

/**
 * Reducer
 */
export default function domains(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_DOMAINS:
      return _.clone(action.payload.domains);
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getDomains(state) {
  return _.get(state, 'domains');
}

export function getDomain(state, key) {
  return _.find(_.get(state, 'domains'), o => _.eq(o.name, key));
}
