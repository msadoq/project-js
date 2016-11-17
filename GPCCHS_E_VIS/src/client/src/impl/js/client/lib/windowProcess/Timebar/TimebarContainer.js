import { connect } from 'react-redux';
import React from 'react';
import { updateVisuWindow, addAndMountTimeline, unmountTimeline,
  updatePlayingState, updateSpeed, updateMasterId, updateMode } from '../../store/actions/timebars';
import { updateId, updateOffset } from '../../store/actions/timelines';
import { getWindowFocusedPageSelector } from '../../store/selectors/windows';
import { getTimebar, getTimebarTimelinesSelector } from '../../store/selectors/timebars';
import TimebarWrapper from './TimebarWrapper';
import SelectTimebar from './SelectTimebar';

export default connect(
  (state, { windowId }) => {
    const { timebarId } = getWindowFocusedPageSelector(state, windowId);
    const timebar = getTimebar(state, timebarId);

    if (!timebar) return { timebars: state.timebars };

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
      timebarId,
      timelines,
      currentSessionOffsetMs,
      sessions: state.sessions
    };
  }, {
    updateModeAction: updateMode,
    updateMasterIdAction: updateMasterId,
    updateOffsetAction: updateOffset,
    updateVisuWindowAction: updateVisuWindow,
    addAndMountTimelineAction: addAndMountTimeline,
    updateTimelineIdAction: updateId,
    unmountTimelineAction: unmountTimeline,
    updatePlayingStateAction: updatePlayingState,
    updateSpeedAction: updateSpeed
  }

)(props => (props.timebar ? <TimebarWrapper {...props} /> : <SelectTimebar {...props} />));
