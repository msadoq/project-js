import __ from 'lodash/fp';
import u from 'updeep';

import * as types from '../types';
import timebar from './timebars/timebar';

// Main timebars reducer
export default function timebars(stateTimebars = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMEBAR_ADD:
      return __.set(action.payload.timebarUuid, timebar(undefined, action), stateTimebars);
    case types.WS_TIMEBAR_REMOVE:
      return __.omit(action.payload.timebarUuid, stateTimebars);
    default: {
      if (
        action.payload &&
        action.payload.timebarUuid &&
        stateTimebars[action.payload.timebarUuid]
      ) {
        const currentTimebar = stateTimebars[action.payload.timebarUuid];
        return u({
          [action.payload.timebarUuid]: timebar(currentTimebar, action),
        }, stateTimebars);
      }
      return stateTimebars;
    }
  }
}
