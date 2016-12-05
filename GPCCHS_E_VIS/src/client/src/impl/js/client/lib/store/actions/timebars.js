import { v4 } from 'node-uuid';
import _get from 'lodash/get';
import simple from '../simpleActionCreator';
import * as types from '../types';
import {
  addOnce as addMessage,
  reset as resetMessages
} from './messages';
import {
  add as addTimeline,
  remove as removeTimeline,
  update as updateTL,
} from './timelines';
import { getTimebar } from '../selectors/timebars';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMEBAR_ADD, 'timebarId', 'configuration');
export const remove = simple(types.WS_TIMEBAR_REMOVE, 'timebarId');
export const updateId = simple(types.WS_TIMEBAR_ID_UPDATE, 'timebarId', 'id');
export const updateCursors = (timebarId, visuWindow, slideWindow) =>
  (dispatch, getState) => {
    const timebar = getTimebar(getState(), timebarId);
    const messages = [];
    const lower = _get(visuWindow, 'lower') || timebar.visuWindow.lower;
    const upper = _get(visuWindow, 'upper') || timebar.visuWindow.upper;
    const current = _get(visuWindow, 'current') || timebar.visuWindow.current;
    const slideLower = _get(slideWindow, 'lower') || timebar.slideWindow.lower;
    const slideUpper = _get(slideWindow, 'upper') || timebar.slideWindow.upper;
    if (lower > current) {
      messages.push('Lower cursor must be before current cursor');
    }
    if (current > upper) {
      messages.push('Current cursor must be before upper cursor');
    }
    if (slideLower < lower || slideLower > current) {
      messages.push('Ext lower cursor must be between lower and current cursors');
    }
    if (timebar.mode === 'Extensible') {
      if (slideUpper < upper) {
        messages.push('Ext upper cursor must be after upper cursor in Extensible mode');
      }
    } else if (timebar.mode === 'Fixed' || timebar.mode === 'Normal') {
      if (slideUpper > upper || slideUpper < current) {
        messages.push('Ext upper cursor must be between current and upper cursor in Fixed and Normal mode');
      }
    }
    if (messages.length) {
      messages.forEach((v) => {
        dispatch(addMessage(`timeSetter-${timebarId}`, 'error', v));
      });
    } else {
      dispatch(resetMessages(`timeSetter-${timebarId}`));
      dispatch({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow,
          slideWindow,
          timebarId,
        }
      });
    }
  };

export const updateViewport = simple(
  types.WS_TIMEBAR_UPDATE_VIEWPORT,
  'timebarId',
  'rulerStart',
  'rulerResolution'
);
export const updateSpeed = simple(types.WS_TIMEBAR_SPEED_UPDATE, 'timebarId', 'speed');
export const updateMode = simple(
  types.WS_TIMEBAR_MODE_UPDATE, 'timebarId', 'mode'
);
export const updateMasterId = simple(types.WS_TIMEBAR_MASTERID_UPDATE, 'timebarId', 'masterId');
export const mountTimeline = simple(types.WS_TIMEBAR_MOUNT_TIMELINE, 'timebarId', 'timelineId');
export const unmountTimeline = simple(types.WS_TIMEBAR_UNMOUNT_TIMELINE, 'timebarId', 'timelineId');

/**
 * Compound actions
 */
export function addAndMountTimeline(timebarId, configuration) {
  return (dispatch) => {
    const timelineId = v4();
    dispatch(addTimeline(timelineId, configuration));
    dispatch(mountTimeline(timebarId, timelineId));
  };
}

export function unmountAndRemoveTimeline(timebarId, timelineId) {
  return (dispatch) => {
    dispatch(unmountTimeline(timebarId, timelineId));
    dispatch(removeTimeline(timelineId));
  };
}

export function updateTimeline(timelineId, configuration) {
  return (dispatch) => {
    dispatch(updateTL(timelineId, configuration));
  };
}
