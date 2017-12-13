// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Player middleware now pause when focus a page with another timebar
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Refacto player middleware + move store/play.js
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : merge dev on abesson-mimic branch .
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Change interval signature in common/utils/interval
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import { getPage } from 'store/reducers/pages';
import { getTimebar } from 'store/reducers/timebars';
import { getPlayingTimebarId } from 'store/reducers/hsc';
import { getHealthMap } from 'store/reducers/health';
import { getIsCodeEditorOpened } from 'store/reducers/codeEditor';

import { updateCursors, switchToRealtimeMode, moveTo } from 'store/actions/timebars';
import { pause } from 'store/actions/hsc';

import ipc from 'serverProcess/ipc';
import { isAnyEditorOpenedInWindow } from 'store/selectors/pages';
import { getCurrentSessionId } from 'store/selectors/sessions';

import createInterval from 'common/utils/interval';
import { HEALTH_STATUS_CRITICAL } from 'constants';
import * as types from 'store/types';
import { add as addMessage } from 'store/actions/messages';

import { nextCurrent, computeCursors } from './cursors';

const nextTick = (delta, currentUpperMargin, dispatch, getState) => {
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

const playHandler = ({ dispatch, getState, interval, currentUpperMargin }, next, action) => {
  const state = getState();
  const health = getHealthMap(state);
  if (
    getIsCodeEditorOpened(state)
    || isAnyEditorOpenedInWindow(state)
  ) {
    dispatch(addMessage(
      'global',
      'warning',
      'Please close editors before play timebar'
      )
    );
  } else if (
    health.dc !== HEALTH_STATUS_CRITICAL
    && health.hss !== HEALTH_STATUS_CRITICAL
    && health.main !== HEALTH_STATUS_CRITICAL
    && health.windows !== HEALTH_STATUS_CRITICAL
  ) {
    interval.resume(delta => (
      nextTick(delta, currentUpperMargin, dispatch, getState)
    ));
    return next(action);
  } else {
    dispatch(addMessage(
      'global',
      'warning',
      'One process of the application is overloaded, cannot switch to play'
      )
    );
  }
  return action;
};

const pauseHandler = ({ interval }, next, action) => {
  interval.pause();
  return next(action);
};

const openEditorHandler = ({ dispatch }, next, action) => {
  dispatch(pause());
  return next(action);
};

const focusPageHandler = ({ dispatch, getState }, next, action) => {
  const state = getState();
  const page = getPage(state, { pageId: action.payload.pageId });
  const playingTimebarId = getPlayingTimebarId(state);
  if (playingTimebarId && playingTimebarId !== page.timebarUuid) {
    dispatch(pause());
  }
  return next(action);
};

const realTimeHandler = ({ dispatch, getState }, next, action) => {
  const { timebarUuid } = action.payload;
  const sessionId = getCurrentSessionId(getState(), { timebarUuid });
  ipc.dc.requestSessionTime(sessionId, ({ timestamp }) => {
    dispatch(switchToRealtimeMode(timebarUuid, timestamp));
  });
  return next(action);
};

const goNowHandler = ({ dispatch, getState }, next, action) => {
  const { timebarUuid } = action.payload;
  const sessionId = getCurrentSessionId(getState(), { timebarUuid });
  ipc.dc.requestSessionTime(sessionId, ({ timestamp }) => {
    dispatch(moveTo(timebarUuid, timestamp));
  });
  return next(action);
};

const makePlayerMiddleware = (
  PLAYER_FREQUENCY = 500,
  VISUWINDOW_CURRENT_UPPER_MIN_MARGIN = 0.1
) => {
  const interval = createInterval(PLAYER_FREQUENCY);
  interval.pause();

  return ({ dispatch, getState }) => next => (action) => {
    if (action.type === types.HSC_PLAY) {
      const currentUpperMargin = VISUWINDOW_CURRENT_UPPER_MIN_MARGIN;
      return playHandler({ dispatch, getState, interval, currentUpperMargin }, next, action);
    }
    if (action.type === types.HSC_PAUSE) {
      return pauseHandler({ dispatch, getState, interval }, next, action);
    }
    if (action.type === types.WS_PAGE_PANELS_LOAD_IN_EDITOR) {
      return openEditorHandler({ dispatch, getState }, next, action);
    }
    if (action.type === types.WS_WINDOW_PAGE_FOCUS) {
      return focusPageHandler({ dispatch, getState }, next, action);
    }
    if (action.type === types.WS_TIMEBAR_SET_REALTIME && action.payload.flag === true) {
      return realTimeHandler({ dispatch, getState }, next, action);
    }
    if (action.type === types.WS_TIMEBAR_GO_NOW) {
      return goNowHandler({ dispatch, getState }, next, action);
    }
    return next(action);
  };
};

export default makePlayerMiddleware;
