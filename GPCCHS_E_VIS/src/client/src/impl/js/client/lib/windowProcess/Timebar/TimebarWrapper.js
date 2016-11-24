import React, { Component } from 'react';
import classnames from 'classnames';
import { Col } from 'react-bootstrap';
import styles from './Timebar.css';
import Timebar from './Timebar';
import LefttabContainer from './LefttabContainer';
import TimebarControls from './TimebarControls';
import Timesetter from './Timesetter';
import debug from '../../../lib/common/debug/windowDebug';

const logger = debug('Timebar');

export default class TimebarWrapper extends Component {

  static propTypes = {
    updateVisuWindowAction: React.PropTypes.func.isRequired,
    updatePlayingStateAction: React.PropTypes.func.isRequired,
    updateSpeedAction: React.PropTypes.func.isRequired,
    updateModeAction: React.PropTypes.func.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
    timebar: React.PropTypes.object.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    focusedPageId: React.PropTypes.string.isRequired,
    timelines: React.PropTypes.array.isRequired,
    sessions: React.PropTypes.array.isRequired,
    currentSessionOffsetMs: React.PropTypes.number
  }

  state = {
    timelinesVerticalScroll: 0,
    displayTimesetter: false,
    timesetterCursor: null,
    timebarDidRender: false
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

  toggleTimebarDidMount = () => {
    this.setState({ timebarDidRender: true });
  }

  mapPropsToTimebarViewport = () => {
    const { rulerStart, rulerResolution } = this.props.timebar;
    const { timebarDidRender } = this.state;
    if (!timebarDidRender) return {};

    return {
      viewport: {
        lower: rulerStart,
        upper: rulerStart + (rulerResolution * this.timebarEl.clientWidth),
      }
    };
  }

  willUpdateVisuWindow = (timebarId, values) => {
    const { updateVisuWindowAction } = this.props;
    const { viewport } = values;

    const newValues = values;
    if (newValues.viewport) {
      newValues.rulerStart = Math.trunc(viewport.lower);
      newValues.rulerResolution = (viewport.upper - viewport.lower) / this.timebarEl.clientWidth;
    }
    updateVisuWindowAction(timebarId, newValues);
  }

  render() {
    logger.debug('render');
    const { displayTimesetter, timesetterCursor,
      timelinesVerticalScroll, resizingWindow } = this.state;
    let { height } = this.state;
    const {
      updateVisuWindowAction,
      timelines,
      timebarId,
      visuWindow,
      updatePlayingStateAction,
      updateSpeedAction,
      timebar,
      slideWindow,
      updateModeAction,
      currentSessionOffsetMs,
      focusedPageId,
    } = this.props;

    let minHeight;
    if (timelines.length < 3) {
      minHeight = 135;
    } else if (timelines.length < 5) {
      minHeight = (timelines.length * 20) + 84;
    } else {
      minHeight = 165;
    }

    if (minHeight > height || !height) {
      height = minHeight;
    }

    let timesetter;
    if (displayTimesetter) {
      timesetter = (<Timesetter
        visuWindow={visuWindow}
        slideWindow={slideWindow}
        timebarMode={timebar.mode}
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
          {...this.mapPropsToTimebarViewport()}
          extUpperBound={timebar.extUpperBound}
          timebarPlayingState={timebar.playingState}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarId={timebarId}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          updatePlayingState={updatePlayingStateAction}
          updateSpeed={updateSpeedAction}
          onChange={this.willUpdateVisuWindow}
          updateMode={updateModeAction}
          currentSessionOffsetMs={currentSessionOffsetMs}
        />
        <Col xs={3} style={{ height: '100%' }}>
          <LefttabContainer
            timebarId={timebarId}
            focusedPageId={focusedPageId}
            masterId={timebar.masterId}
            timebarName={timebar.id}
            timelines={timelines}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={this.onTimelinesVerticalScroll}
          />
        </Col>
        <Col xs={9} style={{ height: '100%' }}>
          <div style={{ height: '100%' }} ref={(el) => { this.timebarEl = el; }}>
            <Timebar
              toggleTimebarDidMount={this.toggleTimebarDidMount}
              {...this.mapPropsToTimebarViewport()}
              updatePlayingState={updatePlayingStateAction}
              playingState={timebar.playingState}
              timebarId={timebarId}
              timebarMode={timebar.mode}
              visuWindow={visuWindow}
              slideWindow={slideWindow}
              timelines={timelines}
              onChange={this.willUpdateVisuWindow}
              verticalScroll={timelinesVerticalScroll}
              onVerticalScroll={this.onTimelinesVerticalScroll}
              displayTimesetter={this.toggleTimesetter}
            />
          </div>
        </Col>
      </div>
    );
  }
}
