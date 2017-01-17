import { v4 } from 'node-uuid';
import _get from 'lodash/get';
import globalConstants from 'common/constants';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { nextCurrent, computeCursors } from '../../mainProcess/play';
import {
  addOnce as addMessage,
  reset as resetMessages
} from './messages';
import { getMessages } from '../selectors/messages';
import {
  add as addTimeline,
  remove as removeTimeline,
  update as updateTL,
} from './timelines';
import { pause } from './hsc';
import {
  getTimebar,
  getMasterTimelineById,
} from '../selectors/timebars';
import {
  getPlayingTimebarId
} from '../selectors/hsc';
import {
  getSession,
} from '../selectors/sessions';

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMEBAR_ADD, 'timebarUuid', 'configuration');
export const remove = simple(types.WS_TIMEBAR_REMOVE, 'timebarUuid');
export const updateId = simple(types.WS_TIMEBAR_ID_UPDATE, 'timebarUuid', 'id');

/*
  Only the first argument must be provided
  the two others are defaultly assigned for tests only
*/
export const handlePlay = (
  lastTickTime = Date.now(),
  dateNow = Date.now(),
  currentUpperMargin = globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN,
) =>
  (dispatch, getState) => {
    const state = getState();
    const playingTimebarUuid = getPlayingTimebarId(state);
    if (!playingTimebarUuid) {
      return;
    }
    const playingTimebar = getTimebar(state, playingTimebarUuid);
    if (!playingTimebar) {
      return;
    }
    const newCurrent = nextCurrent(
      playingTimebar.visuWindow.current,
      playingTimebar.speed,
      (dateNow - lastTickTime)
    );
    const nextCursors = computeCursors(
      newCurrent,
      playingTimebar.visuWindow.lower,
      playingTimebar.visuWindow.upper,
      playingTimebar.slideWindow.lower,
      playingTimebar.slideWindow.upper,
      playingTimebar.mode,
      currentUpperMargin,
    );
    dispatch(updateCursors(
      playingTimebarUuid,
      nextCursors.visuWindow,
      nextCursors.slideWindow
    ));
  };

export const updateCursors = (timebarUuid, visuWindow, slideWindow) =>
  (dispatch, getState) => {
    const state = getState();
    const timebar = getTimebar(state, timebarUuid);
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
      dispatch(pause());
      messages.forEach((v) => {
        dispatch(addMessage(`timeSetter-${timebarUuid}`, 'error', v));
      });
    } else {
      const timeSetterMessages = getMessages(state, `timeSetter-${timebarUuid}`);
      if (timeSetterMessages && timeSetterMessages.length) {
        dispatch(resetMessages(`timeSetter-${timebarUuid}`));
      }
      dispatch({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow,
          slideWindow,
          timebarUuid,
        }
      });
    }
  };

export const updateViewport = simple(
  types.WS_TIMEBAR_UPDATE_VIEWPORT,
  'timebarUuid',
  'rulerStart',
  'rulerResolution'
);
export const updateSpeed = simple(types.WS_TIMEBAR_SPEED_UPDATE, 'timebarUuid', 'speed');

export function restoreWidth(timebarUuid) {
  return (dispatch, getState) => {
    const timebar = getTimebar(getState(), timebarUuid);
    const vw = timebar.visuWindow;
    const newSlideUpper = timebar.mode === 'Extensible' ?
      vw.current + (vw.defaultWidth) :
      vw.current + (vw.defaultWidth / 4);
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower: vw.current - (vw.defaultWidth / 2),
          upper: vw.current + (vw.defaultWidth / 2),
        },
        {
          lower: vw.current - (vw.defaultWidth / 4),
          upper: newSlideUpper,
        },
      )
    );
  };
}

export function jump(timebarUuid, offsetMs) {
  return (dispatch, getState) => {
    const timebar = getTimebar(getState(), timebarUuid);
    const vw = timebar.visuWindow;
    const sw = timebar.slideWindow;
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower: vw.lower + offsetMs,
          upper: vw.upper + offsetMs,
          current: vw.current + offsetMs,
        },
        {
          lower: sw.lower + offsetMs,
          upper: sw.upper + offsetMs,
        },
      )
    );
  };
}

export function goNow(timebarUuid) {
  return (dispatch, getState) => {
    const state = getState();
    const timebar = getTimebar(state, timebarUuid);
    const masterTimeline = getMasterTimelineById(state, timebarUuid);
    if (!masterTimeline) {
      return;
    }
    const currentSession = getSession(state, masterTimeline.sessionId);
    if (!currentSession) {
      return;
    }
    const vw = timebar.visuWindow;
    const msWidth = vw.upper - vw.lower;
    const realTimeMs = Date.now() + currentSession.offsetWithmachineTime;
    const newLower = realTimeMs -
      ((1 - globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN) * msWidth);
    const newUpper = realTimeMs +
      (globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN * msWidth);
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower: newLower,
          upper: newUpper,
          current: realTimeMs,
        },
        {
          lower: newLower,
          upper: newUpper,
        },
      )
    );
  };
}
export function switchToNormalMode(timebarUuid) {
  return (dispatch, getState) => {
    dispatch({
      type: types.WS_TIMEBAR_MODE_UPDATE,
      payload: {
        timebarUuid,
        mode: 'Normal',
      }
    });
    const state = getState();
    const timebar = getTimebar(state, timebarUuid);
    const { visuWindow, slideWindow } = timebar;
    if (slideWindow.upper > visuWindow.upper) {
      dispatch(
        updateCursors(
          timebarUuid,
          null,
          {
            lower: slideWindow.lower,
            upper: visuWindow.upper - ((visuWindow.upper - visuWindow.current) / 2),
          }
        )
      );
    }
  };
}

export function switchToRealtimeMode(timebarUuid) {
  return (dispatch, getState) => {
    dispatch({
      type: types.WS_TIMEBAR_MODE_UPDATE,
      payload: {
        timebarUuid,
        mode: 'Normal',
      }
    });
    const state = getState();
    const timebar = getTimebar(state, timebarUuid);
    const { visuWindow } = timebar;
    const masterTimeline = getMasterTimelineById(state, timebarUuid);
    const currentSession = getSession(state, masterTimeline.sessionId);
    const sessionOffset = currentSession ? currentSession.offsetWithmachineTime : 0;

    const msWidth = visuWindow.upper - visuWindow.lower;
    const realTimeMs = Date.now() + sessionOffset;
    const newLower = realTimeMs -
      ((1 - globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN) * msWidth);
    const newUpper = realTimeMs +
      (globalConstants.HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN * msWidth);
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower: newLower,
          upper: newUpper,
          current: realTimeMs,
        },
        {
          lower: newLower,
          upper: newUpper,
        },
      )
    );
  };
}

export function switchToExtensibleMode(timebarUuid) {
  return (dispatch, getState) => {
    dispatch({
      type: types.WS_TIMEBAR_MODE_UPDATE,
      payload: {
        timebarUuid,
        mode: 'Extensible',
      }
    });
    const state = getState();
    const timebar = getTimebar(state, timebarUuid);
    const { visuWindow, slideWindow } = timebar;
    if (slideWindow.upper < visuWindow.upper) {
      let newSlideUpper = visuWindow.upper + ((visuWindow.upper - visuWindow.lower) / 4);
      if (newSlideUpper - visuWindow.lower > globalConstants.HSC_VISUWINDOW_MAX_LENGTH) {
        newSlideUpper = visuWindow.lower + globalConstants.HSC_VISUWINDOW_MAX_LENGTH;
      }
      dispatch(
        updateCursors(
          timebarUuid,
          null,
          {
            lower: slideWindow.lower,
            upper: newSlideUpper,
          }
        )
      );
    }
  };
}

export function switchToFixedMode(timebarUuid) {
  return (dispatch, getState) => {
    dispatch({
      type: types.WS_TIMEBAR_MODE_UPDATE,
      payload: {
        timebarUuid,
        mode: 'Fixed',
      }
    });
    const state = getState();
    const timebar = getTimebar(state, timebarUuid);
    const { visuWindow, slideWindow } = timebar;
    if (slideWindow.upper > visuWindow.upper) {
      dispatch(
        updateCursors(
          timebarUuid,
          null,
          {
            lower: slideWindow.lower,
            upper: visuWindow.upper - ((visuWindow.upper - visuWindow.current) / 2),
          }
        )
      );
    }
  };
}

export const updateDefaultWidth = simple(types.WS_TIMEBAR_DEFAULTWIDTH_UPDATE, 'timebarUuid', 'defaultWidth');
export const updateMasterId = simple(types.WS_TIMEBAR_MASTERID_UPDATE, 'timebarUuid', 'masterId');
export const mountTimeline = simple(types.WS_TIMEBAR_MOUNT_TIMELINE, 'timebarUuid', 'timelineId');
export const unmountTimeline = simple(types.WS_TIMEBAR_UNMOUNT_TIMELINE, 'timebarUuid', 'timelineId');

/**
 * Compound actions
 */
export function addAndMountTimeline(timebarUuid, configuration) {
  return (dispatch) => {
    const timelineId = v4();
    dispatch(addTimeline(timelineId, configuration));
    dispatch(mountTimeline(timebarUuid, timelineId));
  };
}

export function unmountAndRemoveTimeline(timebarUuid, timelineId) {
  return (dispatch) => {
    dispatch(unmountTimeline(timebarUuid, timelineId));
    dispatch(removeTimeline(timelineId));
  };
}

export function updateTimeline(timelineId, configuration) {
  return (dispatch) => {
    dispatch(updateTL(timelineId, configuration));
  };
}
