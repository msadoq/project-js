// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 10/02/2017 : Timebar realtime mode disabled when user moving current and dragging.
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Timebar components : timebar.masterId is not mandatory anymore.
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Timebar refactoring: components more modular, less props passed.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove react-dimensions from project, use custom HOC
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Removed timeline.timelineUuid, already has timeline.uuid .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Fixing css problem with formattedFullDate el. removed useless props.
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix timebar width and react dimensions
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Synchro between timelines left and timebar timelines.
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove unused parameter from timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Handle panel collapse/expand buttons with css instead of JE and react refs.
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : No need for Dimensions in Timebar -> RightTab, using props from panels.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import _memoize from 'lodash/memoize';
import TimeBar from './Timebar/Timebar';
import ControlsContainer from './Controls/ControlsContainer';
import styles from './RightTab.css';

class RightTabContent extends PureComponent {

  static propTypes = {
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    setRealTime: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    timebar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
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
        sessionName: PropTypes.string.isRequired,
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
      openModal,
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
          'RightTab',
          styles.rightTab,
          'subdiv'
        )}
      >
        <span
          ref={this.assignFormattedFullDateEl}
          className={classnames('FormatedFullDate', styles.formatedFullDate)}
        />
        <ControlsContainer
          timebarRealTime={timebar.realTime}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarUuid={timebar.uuid}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
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
          openModal={openModal}
          retrieveFormattedFullDateEl={this.retrieveFormattedFullDateEl}
          widthPx={containerWidth}
        />
      </div>
    );
  }
}

export default RightTabContent;
