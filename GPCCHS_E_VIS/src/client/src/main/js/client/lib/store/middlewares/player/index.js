import { getPage } from '../../reducers/pages';
import { getTimebar } from '../../reducers/timebars';
import { getPlayingTimebarId } from '../../reducers/hsc';
import { getHealthMap } from '../../reducers/health';
import { getIsCodeEditorOpened } from '../../reducers/codeEditor';

import { updateCursors, switchToRealtimeMode, moveTo } from '../../actions/timebars';
import { pause } from '../../actions/hsc';

import { add as addMessage } from '../../actions/messages';
import { isAnyEditorOpened } from '../../selectors/pages';
import { getCurrentSessionId } from '../../selectors/sessions';

import createInterval from '../../../common/utils/interval';
import { HEALTH_STATUS_CRITICAL } from '../../../constants';
import { nextCurrent, computeCursors } from './cursors';
import * as types from '../../types';

import ipc from '../../../serverProcess/ipc';

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
    || isAnyEditorOpened(state)
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
      'One process of the application is oveloaded, cannot switch to play'
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

const createPlayerMiddleware = (
  PLAYER_FREQUENCY = 500,
  VISUWINDOW_CURRENT_UPPER_MIN_MARGIN = 0.1
) => {
  const interval = createInterval(() => {}, PLAYER_FREQUENCY);
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

export default createPlayerMiddleware;
