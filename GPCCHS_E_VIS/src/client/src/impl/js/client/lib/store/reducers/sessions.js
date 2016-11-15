import _ from 'lodash';
import * as types from '../types';

export default function sessions(state = [], action) {
  switch (action.type) {
    case types.HSS_UPDATE_SESSIONS:
      return _.clone(action.payload.sessions);
    default:
      return state;
  }
}
