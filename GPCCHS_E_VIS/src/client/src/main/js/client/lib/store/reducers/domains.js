import _ from 'lodash';
import * as types from '../types';

export default function domains(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_DOMAINS:
      return _.clone(action.payload.domains);
    default:
      return state;
  }
}
