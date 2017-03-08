import _ from 'lodash/fp';
import _without from 'lodash/without';
import _indexOf from 'lodash/indexOf';
import u from 'updeep';
import * as types from '../types';

// corresponding between timebars and timelines
export default function timebarTimelines(stateTbTl = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_LOAD_DOCUMENTS: {
      return _.compose(
        _.merge(stateTbTl),         // 3. merge with old stateTbTl
        _.mapValues('timelines'),   // 2. map timelines
        _.indexBy('uuid')           // 1. index timebars array by uuid
      )(action.payload.documents.timebars);
    }
    case types.WS_TIMELINE_ADD_NEW: {
      const { timeline, timebarUuid } = action.payload;
      return _.update(timebarUuid, _.concat(_, timeline.uuid), stateTbTl);
    }
    case types.WS_TIMELINE_REMOVE: {
      const { timelineUuid, timebarUuid } = action.payload;
      return _.update(timebarUuid, _.remove(_.equals(timelineUuid)), stateTbTl);
    }
    case types.WS_TBTL_ADD_TIMEBAR:
      if (stateTbTl[action.payload.timebarUuid]) {
        return stateTbTl;
      }
      return { ...stateTbTl, [action.payload.timebarUuid]: [] };
    case types.WS_TBTL_MOUNT_TIMELINE: {
      // Check if timebar already exists
      const timebarUuid = action.payload.timebarUuid;
      const timelineUuid = action.payload.timelineUuid;
      if (!stateTbTl[timebarUuid]) {
        return {
          ...stateTbTl,
          [timebarUuid]: [timelineUuid],
        };
      }
      if (_indexOf(stateTbTl[timebarUuid], timelineUuid) !== -1) {
        return stateTbTl;
      }
      return { ...stateTbTl, [timebarUuid]: [...stateTbTl[timebarUuid], timelineUuid],
      };
    }
    case types.WS_TBTL_REMOVE_TIMEBAR:
      if (!stateTbTl[action.payload.timebarUuid]) {
        return stateTbTl;
      }
      return u(u.omit(action.payload.timebarUuid), stateTbTl);
    case types.WS_TBTL_UNMOUNT_TIMELINE:
      if (!stateTbTl[action.payload.timebarUuid]) {
        return stateTbTl;
      }
      return {
        ...stateTbTl,
        [action.payload.timebarUuid]:
          _without(stateTbTl[action.payload.timebarUuid], action.payload.timelineUuid),
      };
    default:
      return stateTbTl;
  }
}
