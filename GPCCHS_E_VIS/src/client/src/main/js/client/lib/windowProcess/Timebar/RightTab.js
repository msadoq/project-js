import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import TimeBar from './Timebar/Timebar';
import ControlsContainer from './Controls/ControlsContainer';
import styles from './RightTab.css';
import Dimensions from '../common/Dimensions';

class RightTabContent extends PureComponent {

  static propTypes = {
    updateDimensions: PropTypes.func.isRequired,
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    setRealTime: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    timebar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      extUpperBound: PropTypes.number.isRequired,
      rulerResolution: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      rulerStart: PropTypes.number.isRequired,
      masterId: PropTypes.string,
      realTime: PropTypes.bool.isRequired,
      mode: PropTypes.string.isRequired,
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
    }).isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
      })
    ).isRequired,
    containerWidth: PropTypes.number.isRequired,
    timelinesVerticalScroll: PropTypes.number.isRequired,
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateDimensions();
    });
  }

  /*
    Update viewport if current / ext upper is too far right
  */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPlaying) {
      return;
    }
    const {
      timebar,
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
        timebar.uuid,
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
  memoizeviewportDimensions = _memoize(
    (hash, timebarRulerStart, timebarRulerResolution, containerWidth) => {
      const upper = timebarRulerStart + (timebarRulerResolution * containerWidth);
      return {
        lower: timebarRulerStart,
        upper,
      };
    }
  );

  formatViewportDimensions() {
    const { timebar, containerWidth } = this.props;
    return this.memoizeviewportDimensions(
      `${timebar.rulerStart}-${timebar.rulerResolution}-${containerWidth}`,
      timebar.rulerStart,
      timebar.rulerResolution,
      containerWidth
    );
  }

  retrieveFormattedFullDateEl = () => this.formattedFullDateEl;
  assignFormattedFullDateEl = (el) => { this.formattedFullDateEl = el; }

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
      isPlaying,
      play,
      pause,
      timebar,
      toggleTimesetter,
      onTimelinesVerticalScroll,
      timelinesVerticalScroll,
      setRealTime,
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
          ref={this.assignFormattedFullDateEl}
          className={styles.formatedFullDate}
        />
        <ControlsContainer
          timebarRealTime={timebar.realTime}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarUuid={timebar.uuid}
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
          timebarUuid={timebar.uuid}
          timebarMode={timebar.mode}
          timebarRealTime={timebar.realTime}
          setRealTime={setRealTime}
          visuWindow={timebar.visuWindow}
          slideWindow={timebar.slideWindow}
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
