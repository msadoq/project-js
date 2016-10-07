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
