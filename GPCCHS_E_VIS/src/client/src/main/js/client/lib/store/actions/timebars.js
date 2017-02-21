import { v4 } from 'uuid';
import _get from 'lodash/get';
import { get } from 'common/parameters';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { nextCurrent, computeCursors } from '../play';
import {
  addOnce as addMessage,
  reset as resetMessages,
} from './messages';
import { getMessages } from '../selectors/messages';
import {
  add as addTimeline,
  remove as removeTimeline,
  update as updateTL,
} from './timelines';
import { pause, smartPlay } from './hsc';
import { getTimebar } from '../selectors/timebars';
import { getPlayingTimebarId } from '../selectors/hsc';
import { addTimebar, mountTimeline, unmountTimeline } from './timebarTimelines';

const VISUWINDOW_MAX_LENGTH = get('VISUWINDOW_MAX_LENGTH');
const VISUWINDOW_CURRENT_UPPER_MIN_MARGIN = get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN');

/**
 * Simple actions
 */
export const _add = simple(types.WS_TIMEBAR_ADD, 'timebarUuid', 'configuration');
export const remove = simple(types.WS_TIMEBAR_REMOVE, 'timebarUuid');
export const updateId = simple(types.WS_TIMEBAR_ID_UPDATE, 'timebarUuid', 'id');
export const setRealTime = simple(types.WS_TIMEBAR_SET_REALTIME, 'timebarUuid', 'flag');

export const add = (timebarUuid, configuration) =>
  (dispatch, getState) => {
    const state = getState();
    if (getTimebar(state, { timebarUuid })) {
      return;
    }

    dispatch(_add(timebarUuid, configuration));
    dispatch(addTimebar(timebarUuid));
    if (configuration.timelines) {
      configuration.timelines.forEach(tlId => dispatch(mountTimeline(timebarUuid, tlId)));
    }
  };
export const updateCursors = (timebarUuid, visuWindow, slideWindow) =>
  (dispatch, getState) => {
    const state = getState();
    const timebar = getTimebar(state, { timebarUuid });
    const messages = [];
    const lower = _get(visuWindow, 'lower') || timebar.visuWindow.lower;
    const upper = _get(visuWindow, 'upper') || timebar.visuWindow.upper;
    const current = _get(visuWindow, 'current') || timebar.visuWindow.current;
    const newSlideWindow = {
      lower: _get(slideWindow, 'lower') || timebar.slideWindow.lower,
      upper: _get(slideWindow, 'upper') || timebar.slideWindow.upper,
    };
    if (lower > current) {
      messages.push('Lower cursor must be before current cursor');
    }
    if (current > upper) {
      messages.push('Current cursor must be before upper cursor');
    }
    if (newSlideWindow.lower < lower || newSlideWindow.lower > current) {
      newSlideWindow.lower = lower;
    }
    if (timebar.mode === 'Extensible') {
      if (newSlideWindow.upper < upper) {
        newSlideWindow.upper = upper;
      }
    } else if (timebar.mode === 'Fixed' || timebar.mode === 'Normal') {
      if (newSlideWindow.upper > upper || newSlideWindow.upper < current) {
        newSlideWindow.upper = upper;
      }
    }

    if (messages.length) {
      dispatch(pause());
      messages.forEach((v) => {
        dispatch(addMessage(`timeSetter-${timebarUuid}`, 'error', v));
      });
    } else {
      const timeSetterMessages = getMessages(state, { containerId: `timeSetter-${timebarUuid}` });
      if (timeSetterMessages && timeSetterMessages.length) {
        dispatch(resetMessages(`timeSetter-${timebarUuid}`));
      }
      dispatch({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow,
          slideWindow: newSlideWindow,
          timebarUuid,
        },
      });
    }
  };

  /*
    @param : delta = (dateNow - lastTickTime)
    @param: currentUpperMargin = constante
  */
export const handlePlay = (delta, currentUpperMargin) =>
  (dispatch, getState) => {
    const state = getState();
    const playingTimebarUuid = getPlayingTimebarId(state);
    if (!playingTimebarUuid) {
      return;
    }
    const playingTimebar = getTimebar(state, { timebarUuid: playingTimebarUuid });
    if (!playingTimebar) {
      return;
    }
    const newCurrent = nextCurrent(
      playingTimebar.visuWindow.current,
      playingTimebar.speed,
      delta
    );
    const nextCursors = computeCursors(
      newCurrent,
      playingTimebar.visuWindow.lower,
      playingTimebar.visuWindow.upper,
      playingTimebar.slideWindow.lower,
      playingTimebar.slideWindow.upper,
      playingTimebar.mode,
      currentUpperMargin
    );
    dispatch(updateCursors(
      playingTimebarUuid,
      nextCursors.visuWindow,
      nextCursors.slideWindow
    ));
  };

export const updateViewport = simple(
  types.WS_TIMEBAR_UPDATE_VIEWPORT,
  'timebarUuid',
  'rulerStart',
  'rulerResolution'
);

export const updateSpeed = (timebarUuid, speed) =>
  (dispatch, getState) => {
    const timebar = getTimebar(getState(), { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
    dispatch({
      type: types.WS_TIMEBAR_SPEED_UPDATE,
      payload: {
        timebarUuid,
        speed,
      },
    });
  };


export function restoreWidth(timebarUuid) {
  return (dispatch, getState) => {
    const timebar = getTimebar(getState(), { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
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
        }
      )
    );
  };
}

export function jump(timebarUuid, offsetMs) {
  return (dispatch, getState) => {
    const timebar = getTimebar(getState(), { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
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
        }
      )
    );
  };
}

export function goNow(timebarUuid, masterSessionIdCurrentTime) {
  return (dispatch, getState) => {
    const state = getState();
    const timebar = getTimebar(state, { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
    const vw = timebar.visuWindow;
    const msWidth = vw.upper - vw.lower;
    const newLower = masterSessionIdCurrentTime -
      ((1 - VISUWINDOW_CURRENT_UPPER_MIN_MARGIN) * msWidth);
    const newUpper = masterSessionIdCurrentTime +
      (VISUWINDOW_CURRENT_UPPER_MIN_MARGIN * msWidth);
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower: newLower,
          upper: newUpper,
          current: masterSessionIdCurrentTime,
        },
        {
          lower: newLower,
          upper: newUpper,
        }
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
      },
    });
    const state = getState();
    const timebar = getTimebar(state, { timebarUuid });
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

export function switchToRealtimeMode(timebarUuid, masterSessionIdCurrentTime) {
  return (dispatch, getState) => {
    dispatch(setRealTime(timebarUuid, true));
    const state = getState();
    const timebar = getTimebar(state, { timebarUuid });
    if (timebar.speed !== 1) {
      dispatch({
        type: types.WS_TIMEBAR_SPEED_UPDATE,
        payload: {
          timebarUuid,
          speed: 1,
        },
      });
    }
    if (timebar.mode !== 'Normal') {
      dispatch({
        type: types.WS_TIMEBAR_MODE_UPDATE,
        payload: {
          timebarUuid,
          mode: 'Normal',
        },
      });
    }
    const { visuWindow } = timebar;
    const msWidth = visuWindow.upper - visuWindow.lower;
    const newLower = masterSessionIdCurrentTime -
      ((1 - VISUWINDOW_CURRENT_UPPER_MIN_MARGIN) * msWidth);
    const newUpper = masterSessionIdCurrentTime +
      (VISUWINDOW_CURRENT_UPPER_MIN_MARGIN * msWidth);
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower: newLower,
          upper: newUpper,
          current: masterSessionIdCurrentTime,
        },
        {
          lower: newLower,
          upper: newUpper,
        }
      )
    );
    dispatch(smartPlay(timebarUuid));
  };
}

export function switchToExtensibleMode(timebarUuid) {
  return (dispatch, getState) => {
    dispatch({
      type: types.WS_TIMEBAR_MODE_UPDATE,
      payload: {
        timebarUuid,
        mode: 'Extensible',
      },
    });
    const state = getState();
    const timebar = getTimebar(state, { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
    const { visuWindow, slideWindow } = timebar;
    if (slideWindow.upper < visuWindow.upper) {
      let newSlideUpper = visuWindow.upper + ((visuWindow.upper - visuWindow.lower) / 4);
      if (newSlideUpper - visuWindow.lower > VISUWINDOW_MAX_LENGTH) {
        newSlideUpper = visuWindow.lower + VISUWINDOW_MAX_LENGTH;
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
      },
    });
    const state = getState();
    const timebar = getTimebar(state, { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
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

export const updateTimeline = updateTL;
