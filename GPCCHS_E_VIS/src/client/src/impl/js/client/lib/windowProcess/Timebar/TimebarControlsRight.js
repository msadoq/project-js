import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TimebarControls.css';

const currentUpperMargin = 1 / 100;

// max visuWindow length (ms)
const maxVisuWindowWidth = 1000 * 60 * 60 * 2;

export default class TimebarControlsRight extends Component {

  static propTypes = {
    play: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    slideWindow: PropTypes.object.isRequired,
    visuWindow: PropTypes.object.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    currentSessionOffsetMs: PropTypes.number,
  }

  switchMode = (e) => {
    e.preventDefault();
    const {
      updateCursors,
      timebarId,
      timebarMode,
      updateMode,
      visuWindow,
      currentSessionOffsetMs,
      slideWindow,
    } = this.props;
    const { lower, upper, current } = visuWindow;
    const mode = e.currentTarget.getAttribute('mode');

    if (mode === timebarMode) {
      return;
    }

    // Realtime is not really a mode, we just go to session realtime and play
    if (mode === 'Realtime') {
      if (timebarMode !== 'Normal') {
        updateMode(timebarId, 'Normal');
      }
      const msWidth = upper - lower;
      const realTimeMs = Date.now() + currentSessionOffsetMs;
      const newLower = realTimeMs - ((1 - currentUpperMargin) * msWidth);
      const newUpper = realTimeMs + (currentUpperMargin * msWidth);
      updateCursors(
        timebarId,
        {
          lower: newLower,
          upper: newUpper,
          current: realTimeMs,
        },
        {
          lower: newLower - ((newUpper - newLower) * 2),
          upper: newUpper + ((newUpper - newLower) / 5),
        },
      );
      this.props.play(timebarId);
    } else {
      if (mode === 'Extensible' && slideWindow.upper < upper) {
        let newSlideUpper = upper + ((upper - lower) / 4);
        if (newSlideUpper - lower > maxVisuWindowWidth) {
          newSlideUpper = lower + maxVisuWindowWidth;
        }
        updateCursors(
          timebarId,
          null,
          {
            lower: slideWindow.lower,
            upper: newSlideUpper,
          }
        );
      } else if (mode === 'Fixed' && slideWindow.upper > upper) {
        updateCursors(
          timebarId,
          null,
          {
            lower: slideWindow.lower,
            upper: upper - ((upper - current) / 2),
          }
        );
      }
      updateMode(timebarId, mode);
    }
  }

  render() {
    const {
      timebarMode,
      currentSessionOffsetMs
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    return (
      <ul className={classnames(styles.controlsUl, styles.controlsUlRight)}>
        <li className={styles.controlsLi}>
          <button
            mode="Normal"
            className={classnames(
              allButtonsKlasses,
              {
                [styles.controlButtonActive]: (timebarMode === 'Normal')
              }
            )}
            onClick={this.switchMode}
            title="Normal mode"
          >
            Normal
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            mode="Extensible"
            className={classnames(
              allButtonsKlasses,
              {
                [styles.controlButtonActive]: (timebarMode === 'Extensible')
              }
            )}
            onClick={this.switchMode}
            title="Extensible mode"
          >
            Extensible
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            mode="Fixed"
            className={classnames(
              allButtonsKlasses,
              {
                [styles.controlButtonActive]: (timebarMode === 'Fixed')
              }
            )}
            onClick={this.switchMode}
            title="Fixed mode"
          >
            Fixed
          </button>
        </li>
        <li className={styles.controlsLi}>
          <button
            mode="Realtime"
            className={classnames(
              allButtonsKlasses,
              {
                [styles.controlButtonActive]: (timebarMode === 'Realtime')
              }
            )}
            onClick={this.switchMode}
            title={currentSessionOffsetMs ? 'Real time mode' : "No master track is set, can't go realtime"}
            disabled={!currentSessionOffsetMs}
          >
            Real time
          </button>
        </li>
      </ul>
    );
  }
}
