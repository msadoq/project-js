import * as types from '../../types';

export default function hsc(state = {}, action) {
  switch (action.type) {
    case types.HSS_UPDATE_MASTER_SESSION:
      return Object.assign({}, state, { sessionId: action.payload.masterSessionOid });
    default:
      return state;
  }
}
