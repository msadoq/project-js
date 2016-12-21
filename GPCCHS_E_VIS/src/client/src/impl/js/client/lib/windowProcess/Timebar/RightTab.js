import React, { Component, PropTypes } from 'react';
import Dimensions from 'react-dimensions';
import { Col } from 'react-bootstrap';
import TimeBar from './Timebar';
import ControlsContainer from './ControlsContainer';
import styles from './Timebar.css';

const bootstrapPaddings = 5;

class RightTabContent extends Component {

  static propTypes = {
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebar: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    timebarId: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
    currentSession: PropTypes.object,
    containerWidth: PropTypes.number,
    timelinesVerticalScroll: PropTypes.number,
  }

  /*
    Update viewport if current / ext upper is too far right
  */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPlaying) {
      return;
    }
    const {
      timebarId,
      updateViewport,
      containerWidth
    } = this.props;
    const viewport = {
      lower: nextProps.timebar.rulerStart,
      upper: nextProps.timebar.rulerStart +
        (nextProps.timebar.rulerResolution * (this.props.size.width - (bootstrapPaddings * 2))),
    };

    const {
      timebarMode,
      visuWindow,
      slideWindow,
    } = nextProps.timebar;
    const rightLimitMs = viewport.upper - ((viewport.upper - viewport.lower) / 15);
    let limitCursorMs;
    if (timebarMode === 'Normal' || timebarMode === 'Fixed') {
      limitCursorMs = visuWindow.upper;
    } else {
      limitCursorMs = slideWindow.upper;
    }

    if (limitCursorMs > rightLimitMs) {
      const offsetMs = (limitCursorMs - rightLimitMs) + (limitCursorMs - visuWindow.lower);
      updateViewport(
        timebarId,
        viewport.lower + offsetMs,
        (viewport.upper - viewport.lower) / (containerWidth - (bootstrapPaddings * 2))
      );
    }

    return true;
  }

  /*
    Viewport size is stored (in the sotre's timebar object) in the following form:
    {
      rulerStart : ... (ms),
      rulerResolution : ... (px/ms),
    }
    The following method converts the timebar's values rulerStart and rulerResolution
    to the following form :
    {
      lower : ... (ms),
      upper : ... (ms),
    }
    wich is much easier to work with int the subcomponents
  */
  formatViewportDimensions() {
    const { timebar, containerWidth } = this.props;
    return {
      lower: timebar.rulerStart,
      upper: timebar.rulerStart +
        (timebar.rulerResolution * (containerWidth - (bootstrapPaddings * 2))),
    };
  }

  retrieveFormattedFullDateEl = () => this.formattedFullDateEl;

  render() {
    const {
      timelines,
      timebarId,
      visuWindow,
      isPlaying,
      play,
      pause,
      timebar,
      slideWindow,
      currentSession,
      toggleTimesetter,
      onTimelinesVerticalScroll,
      timelinesVerticalScroll,
      containerWidth,
      updateCursors,
      updateViewport,
    } = this.props;

    return (
      <Col xs={9} style={{ height: '100%' }}>
        <span
          ref={(el) => { this.formattedFullDateEl = el; }}
          className={styles.formatedFullDate}
        />
        <ControlsContainer
          viewport={this.formatViewportDimensions()}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarId={timebarId}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          toggleTimesetter={toggleTimesetter}
          updateCursors={updateCursors}
          currentSession={currentSession}
        />
        <TimeBar
          viewport={this.formatViewportDimensions()}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          timebarId={timebarId}
          timebarMode={timebar.mode}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          timelines={timelines}
          updateCursors={updateCursors}
          updateViewport={updateViewport}
          verticalScroll={timelinesVerticalScroll}
          onVerticalScroll={onTimelinesVerticalScroll}
          toggleTimesetter={toggleTimesetter}
          retrieveFormattedFullDateEl={this.retrieveFormattedFullDateEl}
          widthPx={containerWidth - (bootstrapPaddings * 2)}
        />
      </Col>
    );
  }
}

export default Dimensions()(RightTabContent);
