// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for
//  each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebarTimelines simple selector in
//  store/reducers/timebarTimelines
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from 'store/types';

/* --- Reducer -------------------------------------------------------------- */
// corresponding between timebars and timelines
export default function timebarTimelines(stateTbTl = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_WORKSPACE_OPENED: {
      return _.compose(
        _.merge(stateTbTl),         // 3. merge with old stateTbTl
        _.mapValues('timelines'),   // 2. map timelines
        _.indexBy('uuid')           // 1. index timebars array by uuid
      )(action.payload.timebars);
    }
    case types.WS_TIMEBAR_CREATE_NEW:
      return { ...stateTbTl, [action.payload.timebarUuid]: [] };
    case types.WS_TIMELINE_CREATE_NEW: {
      const { timeline, timebarUuid } = action.payload;
      return _.update(timebarUuid, _.concat(_, timeline.uuid), stateTbTl);
    }
    case types.WS_TIMELINE_REMOVE: {
      const { timelineUuid, timebarUuid } = action.payload;
      return _.update(timebarUuid, _.remove(_.equals(timelineUuid)), stateTbTl);
    }
    default:
      return stateTbTl;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getTimebarTimelines =
  (state, { timebarUuid }) => _.getOr([], ['timebarTimelines', timebarUuid], state);
