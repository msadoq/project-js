import React, { Component } from 'react';
import classnames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import globalConstants from 'common/constants';
import styles from './TimebarControls.css';

const currentUpperMargin = 1 / 100;

export default class TimebarControls extends Component {

  static propTypes = {
    timebarId: React.PropTypes.string.isRequired,
    timebarPlayingState: React.PropTypes.string.isRequired,
    timebarMode: React.PropTypes.string.isRequired,
    timebarSpeed: React.PropTypes.number.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    slideWindow: React.PropTypes.object.isRequired,
    updatePlayingState: React.PropTypes.func.isRequired,
    updateSpeed: React.PropTypes.func.isRequired,
    updateVisuWindow: React.PropTypes.func.isRequired,
    updateMode: React.PropTypes.func.isRequired,
    currentSessionOffsetMs: React.PropTypes.number,
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
    if (newSpeed !== 1 && timebarPlayingState === 'pause') this.togglePlayingState();
  }

  goNow = (e) => {
    e.preventDefault();
    const { updateVisuWindow, timebarId } = this.props;
    const { lower, upper } = this.props.visuWindow;

    const nowMs = Date.now();
    const msWidth = upper - lower;
    const newLower = nowMs - msWidth;
    updateVisuWindow(
      timebarId,
      {
        lower: newLower,
        upper: nowMs,
        current: nowMs,
        slideWindow: {
          lower: newLower - (2 * (nowMs - newLower)),
          upper: nowMs + ((nowMs - newLower) / 5)
        }
      }
    );
  }

  jump = (e) => {
    e.preventDefault();
    const { updateVisuWindow, timebarId } = this.props;
    const { lower, upper, current } = this.props.visuWindow;

    const movedMs = 1000 * e.currentTarget.getAttribute('offset');
    updateVisuWindow(
      timebarId,
      {
        lower: lower + movedMs,
        upper: upper + movedMs,
        current: current + movedMs
      }
    );
  }

  switchMode = (e) => {
    e.preventDefault();
    const { updateVisuWindow, timebarId, timebarMode, updateMode,
      visuWindow, currentSessionOffsetMs } = this.props;
    const { lower, upper } = visuWindow;
    const mode = e.currentTarget.getAttribute('mode');

    if (mode === timebarMode) return;

    if (mode === 'Realtime') {
      // Realtime is not really a mode, we just go to session relatime and play
      // updateMode(timebarId, mode);

      const msWidth = upper - lower;
      const realTimeMs = Date.now() + currentSessionOffsetMs;
      const newLower = realTimeMs - ((1 - currentUpperMargin) * msWidth);
      const newUpper = realTimeMs + (currentUpperMargin * msWidth);
      updateVisuWindow(
        timebarId,
        {
          lower: newLower,
          upper: newUpper,
          current: realTimeMs,
          slideWindow: {
            lower: newLower - ((newUpper - newLower) * 2),
            upper: newUpper + ((newUpper - newLower) / 5)
          }
        }
      );
      this.togglePlayingState(null, 'play');
    } else if (mode === 'Normal') {
      updateMode(timebarId, mode);
    }
  }

  togglePlayingState = (e, mode = null) => {
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
    }
  }

  tick() {
    const { updateVisuWindow, timebarId, timebarSpeed, timebarMode, slideWindow } = this.props;
    this.timeout = setTimeout(
      () => {
        const { lower, upper, current } = this.props.visuWindow;

        const newCurrent = current + (globalConstants.HSC_PLAY_FREQUENCY * timebarSpeed);

        const msWidth = upper - lower;
        let offsetMs = 0;
        if (timebarMode === 'Normal' || timebarMode === 'Realtime') {
          if (newCurrent + (currentUpperMargin * msWidth) > upper) {
            offsetMs = (newCurrent + (currentUpperMargin * msWidth)) - upper;
          }
        }

        const newLower = lower + offsetMs;
        const newUpper = upper + offsetMs;
        if (slideWindow.upper < newUpper + ((newUpper - newLower) / 5)) {
          updateVisuWindow(
            timebarId,
            {
              lower: newLower,
              upper: newUpper,
              current: newCurrent,
              slideWindow: {
                lower: newLower - ((newUpper - newLower) * 2),
                upper: newUpper + ((newUpper - newLower) / 5)
              }
            }
          );
        } else {
          updateVisuWindow(
            timebarId,
            {
              lower: lower + offsetMs,
              upper: upper + offsetMs,
              current: newCurrent
            }
          );
        }
        this.tick();
      },
      globalConstants.HSC_PLAY_FREQUENCY
    );
  }

  render() {
    const { timebarPlayingState, timebarSpeed, timebarMode, currentSessionOffsetMs } = this.props;
    const opTimebarPlayingState = timebarPlayingState === 'pause' ? 'play' : 'pause';

    const allButtonsKlasses = classnames('btn', 'btn-xs', styles.controlButton);

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
                    onClick={this.togglePlayingState}
                    title={opTimebarPlayingState}
                  >
                    {timebarPlayingState === 'play' ? <span>&#9613;&#9613;</span> : <span>&#9658;</span>}
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
                <li className={styles.controlsLi}>
                  <button
                    offset={-10}
                    className={allButtonsKlasses}
                    onClick={this.jump}
                    title="- 10s"
                  >
                    - 10s
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    offset={10}
                    className={allButtonsKlasses}
                    onClick={this.jump}
                    title="+ 10s"
                  >
                    + 10s
                  </button>
                </li>
              </ul>
              <ul className={classnames(styles.controlsUl, styles.controlsUlRight)}>
                <li className={styles.controlsLi}>
                  <button
                    mode="Normal"
                    className={classnames(allButtonsKlasses, { [styles.controlButtonActive]: (timebarMode === 'Normal') })}
                    onClick={this.switchMode}
                    title="Normal mode"
                  >
                    Normal
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    mode="Realtime"
                    className={classnames(allButtonsKlasses, { [styles.controlButtonActive]: (timebarMode === 'Realtime') })}
                    onClick={this.switchMode}
                    title="Real time mode"
                    disabled={currentSessionOffsetMs ? '' : 'disabled'}
                  >
                    Real time
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
