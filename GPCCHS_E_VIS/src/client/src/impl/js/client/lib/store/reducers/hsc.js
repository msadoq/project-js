import { LIFECYCLE_NOT_STARTED } from '../../mainProcess/lifecycle';
import * as types from '../types';

export default function hsc(stateHsc = { status: LIFECYCLE_NOT_STARTED }, action) {
  switch (action.type) {
    case types.HSC_UPDATE_STATUS:
      return Object.assign({}, { status: action.payload.status });
    default:
      return stateHsc;
  }
}
