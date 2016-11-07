import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { constants as globalConstants } from 'common';
import styles from './TimebarControls.css';

export default class TimebarControls extends Component {

  static propTypes = {
    timebarId: React.PropTypes.string.isRequired,
    timebarPlayingState: React.PropTypes.string.isRequired,
    timebarSpeed: React.PropTypes.number.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    updatePlayingState: React.PropTypes.func.isRequired,
    updateSpeed: React.PropTypes.func.isRequired,
    updateVisuWindow: React.PropTypes.func.isRequired,
  }

  changeSpeed = (dir) => {
    const { updateSpeed, timebarId, timebarSpeed, timebarPlayingState } = this.props;
    const newSpeed = dir === 'up' ? 2 * timebarSpeed : timebarSpeed / 2;
    updateSpeed(timebarId, newSpeed);
    if (newSpeed !== 1 && timebarPlayingState === 'pause') this.toggleMode();
  }

  goNow = (e) => {
    e.preventDefault();
    const { updateVisuWindow, timebarId } = this.props;
    const { lower, upper, current } = this.props.visuWindow;

    const nowMs = new Date().getTime();
    const movedMs = nowMs - current;
    updateVisuWindow(
      timebarId,
      {
        lower: lower + movedMs,
        upper: upper + movedMs,
        current: nowMs
      }
    );
  }

  toggleMode = () => {
    const { updatePlayingState, timebarId, timebarPlayingState } = this.props;
    const newtimebarPlayingState = (timebarPlayingState === 'pause' ? 'play' : 'pause');
    updatePlayingState(
      timebarId,
      newtimebarPlayingState
    );
    if (newtimebarPlayingState === 'play') {
      this.tick();
    } else {
      clearInterval(this.interval);
    }
  }

  tick() {
    const { updateVisuWindow, timebarId, timebarSpeed } = this.props;
    // const { lower, upper, current } = this.props.visuWindow;
    this.interval = setTimeout(
      () => {
        const { lower, upper, current } = this.props.visuWindow;
        updateVisuWindow(
          timebarId,
          {
            lower: lower + (globalConstants.HSC_PLAY_FREQUENCY * timebarSpeed),
            upper: upper + (globalConstants.HSC_PLAY_FREQUENCY * timebarSpeed),
            current: current + (globalConstants.HSC_PLAY_FREQUENCY * timebarSpeed)
          }
        );
        this.tick();
      },
      globalConstants.HSC_PLAY_FREQUENCY
    );
  }

  render() {
    const { timebarPlayingState, timebarSpeed } = this.props;
    const opTimebarPlayingState = timebarPlayingState === 'pause' ? 'play' : 'pause';

    const allButtonsKlasses = `btn btn-xs btn-primary ${styles.controlButton}`;
    let playButtonKlasses = allButtonsKlasses;
    if (timebarPlayingState === 'play') {
      playButtonKlasses += ` ${styles.controlButtonPlay}`;
    } else {
      playButtonKlasses += ` ${styles.controlButtonPause}`;
    }
    return (
      <div>
        <Col xsOffset={3} xs={9}>
          <Row>
            <Col xs={12}>
              <ul className={`pull-right ${styles.controlsUl}`}>
                <li className={styles.controlsLi}>
                  <button
                    className={allButtonsKlasses}
                    onClick={this.changeSpeed}
                    title="Decrease speed"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: (timebarSpeed < 1 ? `${timebarSpeed}X` : '&#9668;&#9668;') }}
                    />
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={playButtonKlasses}
                    onClick={this.toggleMode}
                    title={opTimebarPlayingState}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: (timebarPlayingState === 'play' ? '&#9613;&#9613;' : '&#9658;') }}
                    />
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={allButtonsKlasses}
                    onClick={this.changeSpeed.bind(null, 'up')}
                    title="Increase speed"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: (timebarSpeed > 1 ? `${timebarSpeed}X` : '&#9658;&#9658;') }}
                    />
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={allButtonsKlasses}
                    onClick={this.goNow}
                    title="Go now"
                  >
                    NOW
                  </button>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
