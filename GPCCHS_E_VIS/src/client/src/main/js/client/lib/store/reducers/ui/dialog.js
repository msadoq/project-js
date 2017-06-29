import _ from 'lodash/fp';
import * as types from '../../types';

export default function dialogReducer(state = {}, action) {
  switch (action.type) {
    case types.HSC_OPEN_DIALOG: {
      return state;
    }
    case types.HSC_CLOSE_DIALOG: {
      return state;
    }
    default: return state;
  }
}
