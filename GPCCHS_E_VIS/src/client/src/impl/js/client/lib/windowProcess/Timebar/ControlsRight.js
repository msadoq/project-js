import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Controls.css';

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
      timebarId,
      timebarMode,
      updateMode,
      play,
    } = this.props;

    const mode = e.currentTarget.getAttribute('mode');

    if (mode === timebarMode) {
      return;
    }

    updateMode(timebarId, mode);
    if (mode === 'Realtime') {
      play(timebarId);
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
