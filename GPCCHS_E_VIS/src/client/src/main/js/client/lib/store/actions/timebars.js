// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Add unit test for timebar action add
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Fix missing wrong selectors calls
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Added default slideWindow values instead of dispatching message timebars#updateCursors.
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Replace thunk by a vanilla action creator in actions/timebars
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_TIMEBAR_ADD by WS_TIMEBAR_CREATE_NEW .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Discard addAndMountTimeline . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Discard unmountAndRemoveTimeline + TBTL actions
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/messages . . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Remove some useless 'addOnce' (messages) .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : split of viewData cleaning in dataReducer for plot
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { v4 } from 'uuid';
import _get from 'lodash/get';
import { get } from 'common/configurationManager';
import simple from '../helpers/simpleActionCreator';
import * as types from '../types';
import {
  add as addMessage,
  reset as resetMessages,
} from './messages';
import { getMessages } from '../reducers/messages';
import {
  update as updateTL,
} from './timelines';
import { pause, play } from './hsc';
import { getTimebar } from '../reducers/timebars';

const VISUWINDOW_MAX_LENGTH = get('VISUWINDOW_MAX_LENGTH');
const VISUWINDOW_CURRENT_UPPER_MIN_MARGIN = get('VISUWINDOW_CURRENT_UPPER_MIN_MARGIN');

/**
 * Simple actions
 */
export const updateId = simple(types.WS_TIMEBAR_ID_UPDATE, 'timebarUuid', 'id');
export const setRealTime = simple(types.WS_TIMEBAR_SET_REALTIME, 'timebarUuid', 'flag');
export const goNow = simple(types.WS_TIMEBAR_GO_NOW, 'timebarUuid');

export const createNewTimebar = timebarId =>
  (dispatch) => {
    // TODO : return if timebarId already exist in store
    dispatch({
      type: types.WS_TIMEBAR_CREATE_NEW,
      payload: {
        timebarUuid: v4(),
        timebarId,
      },
    });
  };

export const updateCursors = (timebarUuid, visuWindow, slideWindow) =>
  // eslint-disable-next-line complexity, "DV6 TBC_CNES Not splittable easily"
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
    if (timebar.mode === 'Extensible' && newSlideWindow.upper < upper) {
      newSlideWindow.upper = upper;
    } else if (
      (timebar.mode === 'Fixed' || timebar.mode === 'Normal')
      && (newSlideWindow.upper > upper || newSlideWindow.upper < current)
    ) {
      newSlideWindow.upper = upper;
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

/**
 * @param timebarUuid
 * @returns {function(*, *)}
 */
export function restoreWidth(timebarUuid) {
  return (dispatch, getState) => {
    const timebar = getTimebar(getState(), { timebarUuid });
    if (timebar.realTime) {
      dispatch(setRealTime(timebarUuid, false));
    }
    const vw = timebar.visuWindow;
    // resize must keep ratio arround current position
    const ratio = (vw.current - vw.lower) / (vw.upper - vw.lower);
    // const newSlideUpper = timebar.mode === 'Extensible' ?
    //   vw.current + (vw.defaultWidth) :
    //   vw.current + (vw.defaultWidth / 4);
    const lower = vw.current - (ratio * vw.defaultWidth);
    dispatch(
      updateCursors(
        timebarUuid,
        {
          lower,
          upper: lower + vw.defaultWidth,
        },
        {
          lower,
          upper: lower + vw.defaultWidth,
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

export function moveTo(timebarUuid, masterSessionIdCurrentTime) {
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
    dispatch(play(timebarUuid));
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

export const updateTimeline = updateTL;
