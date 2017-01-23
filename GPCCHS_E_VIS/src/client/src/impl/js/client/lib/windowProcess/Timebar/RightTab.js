import React, { Component, PropTypes } from 'react';
import Dimensions from 'react-dimensions';
import TimeBar from './Timebar';
import ControlsContainer from './ControlsContainer';
import styles from './Timebar.css';

class RightTabContent extends Component {

  static propTypes = {
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    timebar: PropTypes.object.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timelines: PropTypes.array.isRequired,
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
      timebarUuid,
      updateViewport,
      containerWidth,
    } = this.props;
    const viewport = {
      lower: nextProps.timebar.rulerStart,
      upper: nextProps.timebar.rulerStart +
        (nextProps.timebar.rulerResolution * containerWidth),
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
        timebarUuid,
        viewport.lower + offsetMs,
        (viewport.upper - viewport.lower) / containerWidth
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
        (timebar.rulerResolution * containerWidth),
    };
  }

  retrieveFormattedFullDateEl = () => this.formattedFullDateEl;

  borderColor = () => {
    const {
      isPlaying,
      timebar,
    } = this.props;
    if (isPlaying) {
      if (timebar.speed > 1) {
        return '#ccff66';
      } else if (timebar.speed < 1) {
        return '#0dbf1c';
      } else if (timebar.realTime) {
        return '#60a7e5';
      }
      return '#1E2';
    }
    return 'transparent';
  }

  render() {
    const {
      timelines,
      timebarUuid,
      visuWindow,
      isPlaying,
      play,
      pause,
      timebar,
      slideWindow,
      toggleTimesetter,
      onTimelinesVerticalScroll,
      timelinesVerticalScroll,
      containerWidth,
      updateCursors,
      jump,
      updateViewport,
    } = this.props;

    return (
      <div
        style={{
          height: '100%',
          border: `2px solid ${this.borderColor()}`
        }}
      >
        <span
          ref={(el) => { this.formattedFullDateEl = el; }}
          className={styles.formatedFullDate}
        />
        <ControlsContainer
          timebarRealTime={timebar.realTime}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarUuid={timebarUuid}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          toggleTimesetter={toggleTimesetter}
          jump={jump}
        />
        <TimeBar
          viewport={this.formatViewportDimensions()}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          timebarUuid={timebarUuid}
          timebarMode={timebar.mode}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          timelines={timelines}
          updateCursors={updateCursors}
          jump={jump}
          updateViewport={updateViewport}
          verticalScroll={timelinesVerticalScroll}
          onVerticalScroll={onTimelinesVerticalScroll}
          toggleTimesetter={toggleTimesetter}
          retrieveFormattedFullDateEl={this.retrieveFormattedFullDateEl}
          widthPx={containerWidth}
        />
      </div>
    );
  }
}

export default Dimensions()(RightTabContent);
