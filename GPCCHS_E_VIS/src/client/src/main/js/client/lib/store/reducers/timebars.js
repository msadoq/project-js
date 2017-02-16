import __ from 'lodash/fp';
import u from 'updeep';

import * as types from '../types';
import timebar from './timebars/timebar';

// Main timebars reducer
export default function timebars(stateTimebars = {}, action) {
  const { payload = {} } = action;
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMEBAR_ADD:
      return __.set(action.payload.timebarUuid, timebar(undefined, action), stateTimebars);
    case types.WS_TIMEBAR_REMOVE:
      return __.omit(payload.timebarUuid, stateTimebars);
    default: {
      if (!payload.timebarUuid || !stateTimebars[payload.timebarUuid]) {
        return stateTimebars;
      }
      const currentTimebar = stateTimebars[payload.timebarUuid];
      return u({
        [payload.timebarUuid]: timebar(currentTimebar, action),
      }, stateTimebars);
    }
  }
}
