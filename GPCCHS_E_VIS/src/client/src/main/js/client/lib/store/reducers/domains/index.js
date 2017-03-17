import _clone from 'lodash/clone';
import * as types from '../../types';

export default function domains(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_DOMAINS:
      return _clone(action.payload.domains);
    default:
      return state;
  }
}
