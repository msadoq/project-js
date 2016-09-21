import _ from 'lodash';
import * as types from './types';
import convertWildcard from '../../utils/converter';
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
export function getDomain(state, key) {
  return _.find(_.get(state, 'domains'), o => _.eq(o.name, key));
}

export function getDomainIdsByWildcard(state, search) {
  const regex = new RegExp(convertWildcard(search));
  const listId = _.reduce(_.get(state, 'domains'), (list, domain) => {
    if (regex.test(domain.name)) {
      (list || (list = [])).push(domain.domainId); // eslint-disable-line no-param-reassign
    }
    return list;
  }, []);
  return listId;
}
