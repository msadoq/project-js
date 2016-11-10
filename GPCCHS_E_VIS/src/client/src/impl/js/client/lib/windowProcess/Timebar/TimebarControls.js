import React, { Component } from 'react';
import classnames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import globalConstants from 'common/constants';
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
    let newSpeed = dir === 'up' ? 2 * timebarSpeed : timebarSpeed / 2;
    if (timebarSpeed === 0.1) {
      newSpeed = 0.125;
    } else if (timebarSpeed === 10) {
      newSpeed = 8;
    }
    if (newSpeed > 10) newSpeed = 10;
    if (newSpeed < 0.1) newSpeed = 0.1;
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

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-primary', styles.controlButton);

    return (
      <div>
        <Col xsOffset={3} xs={9}>
          <Row>
            <Col xs={12}>
              <ul className={styles.controlsUl}>
                <li className={styles.controlsLi}>
                  <button
                    className={allButtonsKlasses}
                    onClick={this.changeSpeed}
                    title="Decrease speed"
                  >
                    &#9668;&#9668;
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={classnames('btn', 'btn-xs', 'btn-default', styles.controlButton)}
                  >
                    {`${timebarSpeed}X`}
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={allButtonsKlasses}
                    onClick={this.changeSpeed.bind(null, 'up')}
                    title="Increase speed"
                  >
                    &#9658;&#9658;
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={classnames(
                      allButtonsKlasses,
                      (timebarPlayingState === 'play' ? styles.controlButtonPlay : styles.controlButtonPause)
                    )}
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
