import React, { Component, PropTypes } from 'react';
import globalConstants from 'common/constants';
import compute from '../../mainProcess/play';
import TimebarControlsLeft from './TimebarControlsLeft';
import TimebarControlsRight from './TimebarControlsRight';

const currentUpperMargin = 1 / 100;

export default class TimebarControls extends Component {

  static propTypes = {
    updatePlayingState: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    slideWindow: PropTypes.object.isRequired,
    visuWindow: PropTypes.object.isRequired,
    viewport: PropTypes.object.isRequired,
    timebarPlayingState: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    timebarSpeed: PropTypes.number.isRequired,
  }

  componentDidUpdate() {
    if (this.props.timebarPlayingState === 'play' && !this.timeout) this.tick();
    if (this.props.timebarPlayingState === 'pause' && this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  togglePlayingState = (mode = null) => {
    const { updatePlayingState, timebarId, timebarPlayingState } = this.props;
    const newtimebarPlayingState = mode || (timebarPlayingState === 'pause' ? 'play' : 'pause');
    if (timebarPlayingState === newtimebarPlayingState) return;
    updatePlayingState(
      timebarId,
      newtimebarPlayingState
    );
    if (newtimebarPlayingState === 'play') {
      this.tick();
    } else {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  tick = () => {
    this.timeout = setTimeout(
      () => {
        const {
          onChange,
          timebarId,
          timebarSpeed,
          timebarMode,
          slideWindow,
          visuWindow,
        } = this.props;
        let { viewport } = this.props;
        const { lower, upper, current } = visuWindow;

        const newCurrent = current + (globalConstants.HSC_PLAY_FREQUENCY * timebarSpeed);
        const cursors = compute(
          newCurrent,
          lower,
          upper,
          slideWindow.lower,
          slideWindow.upper,
          timebarMode,
          currentUpperMargin
        );

        /*
          Moving viewport if visuWindow is to far right
        */
        const msWidth = viewport.upper - viewport.lower;
        if (cursors.visuWindow.upper > viewport.upper - (msWidth / 10)) {
          const offsetMs = cursors.visuWindow.upper - (viewport.upper - (msWidth / 10));
          viewport = {
            lower: viewport.lower + offsetMs,
            upper: viewport.upper + offsetMs,
          };
          onChange(
            timebarId,
            {
              lower: cursors.visuWindow.lower,
              upper: cursors.visuWindow.upper,
              current: newCurrent,
              slideWindow: {
                lower: cursors.slideWindow.lower,
                upper: cursors.slideWindow.upper,
              },
              viewport,
            }
          );
        } else {
          onChange(
            timebarId,
            {
              lower: cursors.visuWindow.lower,
              upper: cursors.visuWindow.upper,
              current: newCurrent,
              slideWindow: {
                lower: cursors.slideWindow.lower,
                upper: cursors.slideWindow.upper,
              },
            }
          );
        }

        this.tick();
      },
      globalConstants.HSC_PLAY_FREQUENCY
    );
  }

  render() {
    return (
      <div>
        <TimebarControlsLeft
          {...this.props}
          tick={this.tick}
          togglePlayingState={this.togglePlayingState}
        />
        <TimebarControlsRight
          {...this.props}
          tick={this.tick}
          togglePlayingState={this.togglePlayingState}
        />
      </div>
    );
  }
}
