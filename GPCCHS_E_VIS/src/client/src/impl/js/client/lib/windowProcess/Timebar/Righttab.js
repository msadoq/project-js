// import SizeMe from 'react-sizeme';
import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme';
import { Col } from 'react-bootstrap';
import TimeBar from './Timebar';
import Controls from './Controls';
import styles from './Timebar.css';

const bootstrapPaddings = 5;

class RighttabContent extends Component {

  static propTypes = {
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebar: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    timebarId: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
    currentSessionOffsetMs: PropTypes.number,
    timelinesVerticalScroll: PropTypes.number,
  }

  /*
    Update viewport if current / ext upper is too far right
  */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPlaying) {
      return;
    }
    const { timebarId, updateViewport } = this.props;

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
        (viewport.upper - viewport.lower) / (this.props.size.width - (bootstrapPaddings * 2))
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
    const { timebar } = this.props;
    return {
      lower: timebar.rulerStart,
      upper: timebar.rulerStart +
        (timebar.rulerResolution * (this.props.size.width - (bootstrapPaddings * 2))),
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
      updateSpeed,
      timebar,
      slideWindow,
      updateMode,
      currentSessionOffsetMs,
      toggleTimesetter,
      onTimelinesVerticalScroll,
      timelinesVerticalScroll,
      size,
      updateCursors,
      updateViewport,
    } = this.props;

    return (
      <Col xs={9} style={{ height: '100%' }}>
        <span
          ref={(el) => { this.formattedFullDateEl = el; }}
          className={styles.formatedFullDate}
        />
        <Controls
          viewport={this.formatViewportDimensions()}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarId={timebarId}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          updateSpeed={updateSpeed}
          updateCursors={updateCursors}
          updateMode={updateMode}
          currentSessionOffsetMs={currentSessionOffsetMs}
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
          widthPx={size.width - (bootstrapPaddings * 2)}
        />
      </Col>
    );
  }
}

export default SizeMe()(RighttabContent); // eslint-disable-line new-cap
