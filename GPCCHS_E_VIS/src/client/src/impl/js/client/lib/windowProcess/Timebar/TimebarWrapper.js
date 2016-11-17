import React, { Component } from 'react';
import classnames from 'classnames';
import { Col } from 'react-bootstrap';
import styles from './Timebar.css';
import Timebar from './Timebar';
import Lefttab from './Lefttab';
import TimebarControls from './TimebarControls';
import Timesetter from './Timesetter';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Timebar');

export default class TimebarWrapper extends Component {

  static propTypes = {
    updateVisuWindowAction: React.PropTypes.func.isRequired,
    addAndMountTimelineAction: React.PropTypes.func.isRequired,
    unmountTimelineAction: React.PropTypes.func.isRequired,
    updatePlayingStateAction: React.PropTypes.func.isRequired,
    updateSpeedAction: React.PropTypes.func.isRequired,
    updateMasterIdAction: React.PropTypes.func.isRequired,
    updateOffsetAction: React.PropTypes.func.isRequired,
    updateTimelineIdAction: React.PropTypes.func.isRequired,
    updateModeAction: React.PropTypes.func.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
    timebar: React.PropTypes.object.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timelines: React.PropTypes.array.isRequired,
    sessions: React.PropTypes.array.isRequired,
    currentSessionOffsetMs: React.PropTypes.number,
  }

  state = {
    timelinesVerticalScroll: 0,
    displayTimesetter: false,
    timesetterCursor: null
  };

  onTimelinesVerticalScroll = (e, el) => {
    e.preventDefault();
    this.setState({
      timelinesVerticalScroll: el ? (el.scrollTop + (e.deltaY / 3)) : e.target.scrollTop
    });
  }

  resizeWindow = (e) => {
    this.setState({
      resizingWindow: true,
      cursorOriginY: e.pageY,
      heightOrigin: this.el.clientHeight,
      height: this.el.clientHeight
    });

    document.addEventListener('mousemove', this.resizeWindowMouseMove);
    document.addEventListener('mouseup', this.resizeWindowMouseUp);
    e.stopPropagation();
  }

  resizeWindowMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.resizingWindow) {
      const movedPx = this.state.cursorOriginY - e.pageY;
      this.setState({
        height: this.state.heightOrigin + movedPx
      });
    }
  }

  resizeWindowMouseUp = (e) => {
    document.removeEventListener('mousemove', this.resizeWindowMouseMove);
    document.removeEventListener('mouseup', this.resizeWindowMouseUp);
    this.setState({ resizingWindow: false });
    e.preventDefault();
  }

  toggleTimesetter = (e) => {
    if (e) {
      e.preventDefault();
      if (e.currentTarget.tagName !== e.target.tagName) return;
    }
    const { displayTimesetter } = this.state;
    this.setState({
      displayTimesetter: !displayTimesetter,
      timesetterCursor: (e && e.currentTarget) ? e.currentTarget.getAttribute('cursor') : null
    });
  }

  render() {
    logger.debug('render');
    const { displayTimesetter, timesetterCursor,
      timelinesVerticalScroll, resizingWindow } = this.state;
    let { height } = this.state;
    const { updateVisuWindowAction, timelines, timebarId,
      visuWindow, addAndMountTimelineAction, unmountTimelineAction,
      updatePlayingStateAction, updateSpeedAction, timebar,
      slideWindow, updateTimelineIdAction, updateMasterIdAction,
      updateOffsetAction, updateModeAction, sessions,
      currentSessionOffsetMs } = this.props;

    let minHeight;
    if (timelines.length < 6) {
      minHeight = 180;
    } else if (timelines.length < 8) {
      minHeight = (timelines.length * 20) + 81;
    } else {
      minHeight = 231;
    }

    if (minHeight > height || !height) {
      height = minHeight;
    }

    let timesetter;
    if (displayTimesetter) {
      timesetter = (<Timesetter
        visuWindow={visuWindow}
        extUpperBound={timebar.extUpperBound}
        onChange={updateVisuWindowAction}
        timebarId={timebarId}
        cursor={timesetterCursor || 'all'}
        onClose={this.toggleTimesetter}
      />);
    }

    return (
      <div
        ref={(el) => { this.el = el; }}
        style={{ flex: '0 0 auto', height: `${height}px` }}
      >
        {timesetter}
        <Col xs={12} style={{ paddingBottom: 2 }}>
          <div>
            <hr
              onMouseDown={this.resizeWindow}
              className={
                classnames(
                  styles.resizeTimebarContainer,
                  (resizingWindow ? styles.resizingTimebarContainer : null))
              }
            />
          </div>
        </Col>
        <TimebarControls
          extUpperBound={timebar.extUpperBound}
          timebarPlayingState={timebar.playingState}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarId={timebarId}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          updatePlayingState={updatePlayingStateAction}
          updateSpeed={updateSpeedAction}
          updateVisuWindow={updateVisuWindowAction}
          updateMode={updateModeAction}
          currentSessionOffsetMs={currentSessionOffsetMs}
        />
        <Col xs={3}>
          <Lefttab
            updateMasterId={updateMasterIdAction}
            updateOffset={updateOffsetAction}
            updateTimelineId={updateTimelineIdAction}
            timebarId={timebarId}
            masterId={timebar.masterId}
            timebarName={timebar.id}
            timelines={timelines}
            sessions={sessions}
            addAndMountTimeline={addAndMountTimelineAction}
            unmountTimeline={unmountTimelineAction}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={this.onTimelinesVerticalScroll}
          />
        </Col>
        <Col xs={9}>
          <Timebar
            updatePlayingState={updatePlayingStateAction}
            playingState={timebar.playingState}
            extUpperBound={timebar.extUpperBound}
            timebarId={timebarId}
            timebarMode={timebar.mode}
            visuWindow={visuWindow}
            slideWindow={slideWindow}
            timelines={timelines}
            onChange={updateVisuWindowAction}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={this.onTimelinesVerticalScroll}
            displayTimesetter={this.toggleTimesetter}
          />
        </Col>
      </div>
    );
  }
}
