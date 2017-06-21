import createInterval from '../../common/utils/interval';

import { updateCursors } from '../actions/timebars';
import { getTimebar } from '../reducers/timebars';
import { getPlayingTimebarId } from '../reducers/hsc';
import { nextCurrent, computeCursors } from '../play';

import { pause } from '../actions/hsc';
import { add as addMessage } from '../actions/messages';
import { isAnyEditorOpened } from '../selectors/pages';
import { HEALTH_STATUS_CRITICAL } from '../../constants';
import { getHealthMap } from '../reducers/health';
import { getIsCodeEditorOpened } from '../reducers/editor';

const playingTick = (delta, currentUpperMargin, dispatch, getState) => {
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

const createPlayerMiddleware = (
  PLAYER_FREQUENCY = 500,
  VISUWINDOW_CURRENT_UPPER_MIN_MARGIN = 0.1
) => {
  const interval = createInterval(() => {}, PLAYER_FREQUENCY);
  interval.pause();

  return ({ dispatch, getState }) => next => (action) => {
    if (action.type === 'HSC_PLAY') {
      const play = () => interval.resume(delta => (
        playingTick(delta, VISUWINDOW_CURRENT_UPPER_MIN_MARGIN, dispatch, getState)
      ));
      const health = getHealthMap(getState());
      if (
        getIsCodeEditorOpened(getState())
        || isAnyEditorOpened(getState())
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
        play();
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
    }
    if (action.type === 'HSC_PAUSE') {
      interval.pause();
    }
    if (action.type === 'WS_PAGE_PANELS_LOAD_IN_EDITOR') {
      dispatch(pause());
    }
    return next(action);
  };
};

export default createPlayerMiddleware;
