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
    viewport: React.PropTypes.object,
    updatePlayingState: React.PropTypes.func.isRequired,
    updateSpeed: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    updateMode: React.PropTypes.func.isRequired,
    currentSessionOffsetMs: React.PropTypes.number,
  }

  componentDidUpdate() {
    const { timebarPlayingState } = this.props;
    if (timebarPlayingState === 'play' && !this.timeout) this.tick();
    if (timebarPlayingState === 'pause' && this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
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
    const { onChange, timebarId } = this.props;
    const { lower, upper } = this.props.visuWindow;

    const nowMs = Date.now();
    const msWidth = upper - lower;
    const newLower = nowMs - msWidth;
    onChange(
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
    const { onChange, timebarId, slideWindow } = this.props;
    const { lower, upper, current } = this.props.visuWindow;

    const movedMs = 1000 * e.currentTarget.getAttribute('offset');
    onChange(
      timebarId,
      {
        lower: lower + movedMs,
        upper: upper + movedMs,
        current: current + movedMs,
        slideWindow: {
          lower: slideWindow.lower + movedMs,
          upper: slideWindow.upper + movedMs,
        }
      }
    );
  }

  switchMode = (e) => {
    e.preventDefault();
    const { onChange, timebarId, timebarMode, updateMode,
      visuWindow, currentSessionOffsetMs } = this.props;
    const { lower, upper } = visuWindow;
    const mode = e.currentTarget.getAttribute('mode');

    if (mode === timebarMode) return;

    // Realtime is not really a mode, we just go to session realtime and play
    if (mode === 'Realtime') {
      const msWidth = upper - lower;
      const realTimeMs = Date.now() + currentSessionOffsetMs;
      const newLower = realTimeMs - ((1 - currentUpperMargin) * msWidth);
      const newUpper = realTimeMs + (currentUpperMargin * msWidth);
      onChange(
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
    } else {
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
      this.timeout = null;
    }
  }

  tick() {
    const { onChange, timebarId, timebarSpeed, timebarMode, viewport } = this.props;
    this.timeout = setTimeout(
      () => {
        const { lower, upper, current } = this.props.visuWindow;
        const { slideWindow } = this.props;

        const newCurrent = current + (globalConstants.HSC_PLAY_FREQUENCY * timebarSpeed);

        const msWidth = upper - lower;
        let offsetMs = 0;

        /*
          Current can not equal upper
          there is a mandatory margin between the two cursors
        */
        const mandatoryMarginMs = currentUpperMargin * msWidth;

        if (timebarMode === 'Normal' || timebarMode === 'Extensible') {
          if (newCurrent + mandatoryMarginMs > upper) {
            offsetMs = (newCurrent + mandatoryMarginMs) - upper;
          }
        } else if (timebarMode === 'Fixed') {
          if (newCurrent + mandatoryMarginMs > slideWindow.upper) {
            offsetMs = (newCurrent + mandatoryMarginMs) - slideWindow.upper;
          }
        }

        const newLower = lower + offsetMs;
        const newUpper = upper + offsetMs;

        /*
          Handling the case where upper cursor is above/near slideWindow.upper
          Moving slideWindow to the right if it's the case
        */
        const newViewport = {};
        if (viewport.upper < newUpper + ((newUpper - newLower) / 5)) {
          newViewport.viewport = {};
          newViewport.viewport.lower = newLower - ((newUpper - newLower) * 2);
          newViewport.viewport.upper = newUpper + ((newUpper - newLower) / 5);
        }

        switch (timebarMode) {
          case 'Normal':
            onChange(
              timebarId,
              {
                ...newViewport,
                lower: newLower,
                upper: newUpper,
                current: newCurrent
              }
            );
            break;
          case 'Extensible':
            if (newUpper > slideWindow.upper) {
              onChange(
                timebarId,
                {
                  ...newViewport,
                  lower: newLower,
                  upper: newUpper,
                  current: newCurrent,
                  slideWindow: {
                    upper: newUpper,
                    lower: slideWindow.lower + offsetMs
                  }
                }
              );
            } else {
              onChange(
                timebarId,
                {
                  ...newViewport,
                  lower,
                  upper: newUpper,
                  current: newCurrent
                }
              );
            }
            break;
          case 'Fixed':
            if (newUpper > slideWindow.upper) {
              onChange(
                timebarId,
                {
                  ...newViewport,
                  lower: newLower,
                  upper: newUpper,
                  current: newCurrent,
                  slideWindow: {
                    lower: slideWindow.lower + offsetMs,
                    upper: slideWindow.upper + offsetMs,
                  }
                }
              );
            } else {
              onChange(
                timebarId,
                {
                  ...newViewport,
                  lower,
                  upper,
                  current: newCurrent
                }
              );
            }
            break;
          default:
            break;
        }
        this.tick();
      },
      globalConstants.HSC_PLAY_FREQUENCY
    );
  }

  render() {
    const { timebarPlayingState, timebarSpeed,
      timebarMode, currentSessionOffsetMs, viewport } = this.props;
    const opTimebarPlayingState = timebarPlayingState === 'pause' ? 'play' : 'pause';

    if (!viewport) return (<div />);

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

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
                    className={classnames('btn', 'btn-xs', 'btn-default')}
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
                      {
                        [styles.controlButtonPlay]: timebarPlayingState === 'play',
                        [styles.controlButtonActive]: timebarPlayingState === 'play',
                        [styles.controlButtonPause]: timebarPlayingState === 'pause'
                      }
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
                    mode="Extensible"
                    className={classnames(allButtonsKlasses, { [styles.controlButtonActive]: (timebarMode === 'Extensible') })}
                    onClick={this.switchMode}
                    title="Extensible mode"
                  >
                    Extensible
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    mode="Fixed"
                    className={classnames(allButtonsKlasses, { [styles.controlButtonActive]: (timebarMode === 'Fixed') })}
                    onClick={this.switchMode}
                    title="Fixed mode"
                  >
                    Fixed
                  </button>
                </li>
                <li className={styles.controlsLi}>
                  <button
                    mode="Realtime"
                    className={classnames(allButtonsKlasses, { [styles.controlButtonActive]: (timebarMode === 'Realtime') })}
                    onClick={this.switchMode}
                    title={currentSessionOffsetMs ? 'Real time mode' : "No master track is set, can't go realtime"}
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
