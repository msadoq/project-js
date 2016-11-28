// import SizeMe from 'react-sizeme';
import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme';
import { Col } from 'react-bootstrap';
import Timebar from './Timebar';
import TimebarControls from './TimebarControls';
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
    displayTimesetter: PropTypes.func.isRequired,
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
    ( does the opposite conversion as formatViewportDimensions before dispatching)
    Viewport size is received in the following form:
    {
      lower(ms) : ... ,
      upper(ms) : ... ,
    }
    This method converts it to the following form (store formatted):
    {
      rulerStart : ... (ms),
      rulerResolution : ... (px/ms),
    }
  */
  willUpdateCursors= (timebarId, values) => {
    const { updateCursors, updateViewport, size } = this.props;
    const { viewport } = values;
    if (viewport) {
      const rulerStart = Math.trunc(viewport.lower);
      const rulerResolution = (viewport.upper - viewport.lower)
        / (size.width - (bootstrapPaddings * 2));
      updateViewport(
        timebarId,
        rulerStart,
        rulerResolution
      );
    }
    if (values.lower || values.upper || values.current || values.slideWindow) {
      updateCursors(
        timebarId,
        {
          lower: values.lower,
          upper: values.upper,
          current: values.current,
        },
        values.slideWindow
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
      displayTimesetter,
      onTimelinesVerticalScroll,
      timelinesVerticalScroll,
      size,
    } = this.props;

    return (
      <Col xs={9} style={{ height: '100%' }}>
        <span
          ref={(el) => { this.formattedFullDateEl = el; }}
          className={styles.formatedFullDate}
        />
        <TimebarControls
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
          onChange={this.willUpdateCursors}
          updateMode={updateMode}
          currentSessionOffsetMs={currentSessionOffsetMs}
        />
        <Timebar
          viewport={this.formatViewportDimensions()}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          timebarId={timebarId}
          timebarMode={timebar.mode}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          timelines={timelines}
          onChange={this.willUpdateCursors}
          verticalScroll={timelinesVerticalScroll}
          onVerticalScroll={onTimelinesVerticalScroll}
          displayTimesetter={displayTimesetter}
          retrieveFormattedFullDateEl={this.retrieveFormattedFullDateEl}
          widthPx={size.width - (bootstrapPaddings * 2)}
        />
      </Col>
    );
  }
}

export default SizeMe()(RighttabContent); // eslint-disable-line new-cap
