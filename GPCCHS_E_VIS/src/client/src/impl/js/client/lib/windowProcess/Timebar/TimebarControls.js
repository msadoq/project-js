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

  updatePlayingState = (e) => {
    e.preventDefault();
    const { updatePlayingState, timebarId, timebarPlayingState } = this.props;
    updatePlayingState(
      timebarId,
      (timebarPlayingState === 'pause' ? 'play' : 'pause')
    );
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
    const { updateVisuWindow, timebarId } = this.props;
    const { lower, upper, current } = this.props.visuWindow;
    this.interval = setTimeout(
      () => {
        updateVisuWindow(
          timebarId,
          {
            lower: lower + globalConstants.HSC_PLAY_FREQUENCY,
            upper: upper + globalConstants.HSC_PLAY_FREQUENCY,
            current: current + globalConstants.HSC_PLAY_FREQUENCY
          }
        );
        this.tick();
      },
      globalConstants.HSC_PLAY_FREQUENCY
    );
  }

  render() {
    const { timebarPlayingState } = this.props;
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
                  <button className={allButtonsKlasses}>&#9668;&#9668;</button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    className={playButtonKlasses}
                    onClick={this.toggleMode}
                    title={opTimebarPlayingState}
                  >
                    <span dangerouslySetInnerHTML={{ __html: (timebarPlayingState === 'play' ? '&#9613;&#9613;' : '&#9658;') }} />
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button className={allButtonsKlasses}>&#9658;&#9658;</button>
                </li>
                <li className={styles.controlsLi}>
                  <button onClick={this.goNow} className={allButtonsKlasses} title="Go now">NOW</button>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}
