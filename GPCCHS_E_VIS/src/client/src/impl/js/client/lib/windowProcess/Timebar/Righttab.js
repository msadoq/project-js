// import SizeMe from 'react-sizeme';
import React, { Component, PropTypes } from 'react';
import SizeMe from 'react-sizeme';
import { Col } from 'react-bootstrap';
import Timebar from './Timebar';
import TimebarControls from './TimebarControls';

const bootstrapPaddings = 5;

class Righttab extends Component {

  static propTypes = {
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateVisuWindow: PropTypes.func.isRequired,
    updatePlayingState: PropTypes.func.isRequired,
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
    Viewport size is recieved in the following form:
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
  willUpdateVisuWindow = (timebarId, values) => {
    const { updateVisuWindow, size } = this.props;
    const { viewport } = values;

    const newValues = values;
    if (newValues.viewport) {
      newValues.rulerStart = Math.trunc(viewport.lower);
      newValues.rulerResolution = (viewport.upper - viewport.lower)
        / (size.width - (bootstrapPaddings * 2));
      delete newValues.viewport;
    }
    updateVisuWindow(timebarId, newValues);
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

  render() {
    const {
      timelines,
      timebarId,
      visuWindow,
      updatePlayingState,
      updateSpeed,
      timebar,
      slideWindow,
      updateMode,
      currentSessionOffsetMs,
      displayTimesetter,
      onTimelinesVerticalScroll,
      timelinesVerticalScroll,
    } = this.props;

    return (
      <Col xs={9} style={{ height: '100%' }}>
        <TimebarControls
          viewport={this.formatViewportDimensions()}
          timebarPlayingState={timebar.playingState}
          timebarMode={timebar.mode}
          timebarSpeed={timebar.speed}
          timebarId={timebarId}
          visuWindow={visuWindow}
          slideWindow={slideWindow}
          updatePlayingState={updatePlayingState}
          updateSpeed={updateSpeed}
          onChange={this.willUpdateVisuWindow}
          updateMode={updateMode}
          currentSessionOffsetMs={currentSessionOffsetMs}
        />
        <div style={{ height: '100%' }} ref={(el) => { this.timebarEl = el; }}>
          <Timebar
            viewport={this.formatViewportDimensions()}
            updatePlayingState={updatePlayingState}
            playingState={timebar.playingState}
            timebarId={timebarId}
            timebarMode={timebar.mode}
            visuWindow={visuWindow}
            slideWindow={slideWindow}
            timelines={timelines}
            onChange={this.willUpdateVisuWindow}
            verticalScroll={timelinesVerticalScroll}
            onVerticalScroll={onTimelinesVerticalScroll}
            displayTimesetter={displayTimesetter}
          />
        </div>
      </Col>
    );
  }
}

export default SizeMe()(Righttab); // eslint-disable-line new-cap
