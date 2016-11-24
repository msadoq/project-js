import { connect } from 'react-redux';
import React from 'react';
import _get from 'lodash/get';
import { updateVisuWindow, updatePlayingState, updateSpeed, updateMode } from '../../store/actions/timebars';
import { getTimebar, getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import TimebarWrapper from './TimebarWrapper';
import SelectTimebarContainer from './SelectTimebarContainer';

export default connect(
  (state, { focusedPageId }) => {
    const { timebarId } = _get(state, ['pages', focusedPageId]);
    const timebar = getTimebar(state, timebarId);
    if (!timebar) {
      return { timebars: state.timebars };
    }

    const timelines = getTimebarTimelinesSelector(state, timebarId);
    const masterTimeline = (timelines[0] && timelines[0].id === timebar.masterId) ?
      timelines[0] : null;
    if (!masterTimeline) console.log('NO MASTER TIMELINE');

    let currentSession;
    if (masterTimeline) {
      currentSession = state.sessions.find(s => (s.id === masterTimeline.sessionId));
    }
    if (!currentSession) console.log('NO CURRENT SESSION');

    const currentSessionOffsetMs = currentSession ? currentSession.offsetWithmachineTime : null;

    return {
      visuWindow: timebar.visuWindow,
      slideWindow: timebar.slideWindow,
      timebar,
      focusedPageId,
      timebarId,
      timelines,
      currentSessionOffsetMs,
      sessions: state.sessions,
    };
  }, {
    updateModeAction: updateMode,
    updateVisuWindowAction: updateVisuWindow,
    updatePlayingStateAction: updatePlayingState,
    updateSpeedAction: updateSpeed,
  }

)(props => (props.timebar ? <TimebarWrapper {...props} /> : <SelectTimebarContainer {...props} />));
