import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import Dimensions from 'react-dimensions';
import TimeBar from './Timebar';
import ControlsContainer from './ControlsContainer';
import styles from './Timebar.css';

class RightTabContent extends PureComponent {

  static propTypes = {
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    slideWindow: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
    }).isRequired,
    visuWindow: PropTypes.shape({
      lower: PropTypes.number.isRequired,
      upper: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
    }).isRequired,
    timebar: PropTypes.shape({
      extUpperBound: PropTypes.number.isRequired,
      rulerResolution: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      rulerStart: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      masterId: PropTypes.string.isRequired,
      mode: PropTypes.string.isRequired,
      realTime: PropTypes.bool.isRequired,
      slideWindow: PropTypes.shape({
        lower: PropTypes.number.isRequired,
        upper: PropTypes.number.isRequired,
      }).isRequired,
      visuWindow: PropTypes.shape({
        lower: PropTypes.number.isRequired,
        upper: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        defaultWidth: PropTypes.number.isRequired,
      }).isRequired,
      timelines: PropTypes.arrayOf(
        PropTypes.string.isRequired
      ).isRequired,
    }).isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        timelineId: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
      })
    ).isRequired,
    containerWidth: PropTypes.number.isRequired,
    timelinesVerticalScroll: PropTypes.number.isRequired,
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

  borderColorKlass = () => {
    const {
      isPlaying,
      timebar,
    } = this.props;
    if (isPlaying) {
      if (timebar.speed > 1) {
        return 'acc';
      } else if (timebar.speed < 1) {
        return 'desc';
      } else if (timebar.realTime) {
        return 'realtime';
      }
      return 'play';
    }
    return 'pause';
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
        className={classnames(
          styles[this.borderColorKlass()],
          styles.rightTab,
          'subdiv'
        )}
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
