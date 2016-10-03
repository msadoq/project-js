import { v4 } from 'node-uuid';
import simple from './simpleActionCreator';
import * as types from './types';
import {
  add as addTimeline,
  remove as removeTimeline,
  update as updateTL,
} from './timelineActions';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMEBAR_ADD, 'timebarId', 'configuration');
export const remove = simple(types.WS_TIMEBAR_REMOVE, 'timebarId');
export const updateId = simple(types.WS_TIMEBAR_ID_UPDATE, 'timebarId', 'id');
export const updateVisuWindow = simple(types.WS_TIMEBAR_VISUWINDOW_UPDATE,
  'timebarId',
  'lower',
  'upper',
  'current'
);
export const updateSpeed = simple(types.WS_TIMEBAR_SPEED_UPDATE, 'timebarId', 'speed');
export const updatePlayingState = simple(types.WS_TIMEBAR_PLAYINGSTATE_UPDATE, 'timebarId',
'playingState');
export const updateMasterId = simple(types.WS_TIMEBAR_MASTERID_UPDATE, 'timebarId', 'masterId');
export const mountTimeline = simple(types.WS_TIMEBAR_MOUNT_TIMELINE, 'timebarId', 'timelineId');
export const unmountTimeline = simple(types.WS_TIMEBAR_UNMOUNT_TIMELINE, 'timebarId', 'timelineId');

/**
 * Compound actions
 */
export function addAndMountTimeline(timebarId, configuration) {
  return dispatch => {
    const timelineId = v4();
    dispatch(addTimeline(timelineId, configuration));
    dispatch(mountTimeline(timebarId, timelineId));
  };
}

export function unmountAndRemoveTimeline(timebarId, timelineId) {
  return dispatch => {
    dispatch(unmountTimeline(timebarId, timelineId));
    dispatch(removeTimeline(timelineId));
  };
}

export function updateTimeline(timelineId, configuration) {
  return dispatch => {
    dispatch(updateTL(timelineId, configuration));
  }
}
