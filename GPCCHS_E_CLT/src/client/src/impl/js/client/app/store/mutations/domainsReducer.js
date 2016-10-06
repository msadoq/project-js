import _ from 'lodash';
import * as types from '../types';

/**
 * Reducer
 */
export default function domains(stateDomains = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_DOMAINS:
      return _.clone(action.payload.domains);
    default:
      return stateDomains;
  }
}

/**
 * Selectors
 */
// TODO test
// TODO rename as getDomainByName (or remove)
// TODO implement a simple getDomain (by uuid)
export function getDomain(state, key) {
  return _.find(_.get(state, 'domains'), o => _.eq(o.name, key));
}
