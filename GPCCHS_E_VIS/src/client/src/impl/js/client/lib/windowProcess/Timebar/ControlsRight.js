import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Help from './Help';
import Modal from '../common/Modal';
import styles from './Controls.css';

export default class TimebarControlsRight extends Component {

  static propTypes = {
    play: PropTypes.func.isRequired,
    switchToNormalMode: PropTypes.func.isRequired,
    switchToRealtimeMode: PropTypes.func.isRequired,
    switchToExtensibleMode: PropTypes.func.isRequired,
    switchToFixedMode: PropTypes.func.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    currentSession: PropTypes.object,
  }

  state = {
    showHelpModal: false,
  }

  toggleHelpModal = (e) => {
    e.preventDefault();
    this.setState({
      showHelpModal: !this.state.showHelpModal,
    });
  }

  switchMode = (e) => {
    e.preventDefault();
    const {
      timebarId,
      timebarMode,
      switchToNormalMode,
      switchToRealtimeMode,
      switchToExtensibleMode,
      switchToFixedMode,
      play,
    } = this.props;

    const mode = e.currentTarget.getAttribute('mode');

    if (mode === timebarMode) {
      return;
    }
    if (mode === 'Normal') {
      switchToNormalMode(timebarId);
    } else if (mode === 'Extensible') {
      switchToExtensibleMode(timebarId);
    } else if (mode === 'Fixed') {
      switchToFixedMode(timebarId);
    } else if (mode === 'Realtime') {
      switchToRealtimeMode(timebarId);
      play(timebarId);
    }
  }

  render() {
    const {
      timebarMode,
      currentSession
    } = this.props;

    const {
      showHelpModal,
    } = this.state;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    return (
      <div>
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
              title={currentSession ? 'Real time mode' : "No master track is set, can't go realtime"}
              disabled={!currentSession}
            >
              Real time
            </button>
          </li>
          <li className={styles.controlsLi}>
            <button
              className={allButtonsKlasses}
              onClick={this.toggleHelpModal}
              title="Help modal"
            >
              ?
            </button>
          </li>
        </ul>
        <Modal
          title="Timebar main commands"
          onClose={this.toggleHelpModal}
          isOpened={showHelpModal}
        >
          <Help />
        </Modal>
      </div>
    );
  }
}
