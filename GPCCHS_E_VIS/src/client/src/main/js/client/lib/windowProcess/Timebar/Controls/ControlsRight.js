import React, { PureComponent, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Controls.css';
import { main } from '../../ipc';

const OverlayTriggerTrigger = ['hover', 'focus'];

const inlineStyles = {
  width200: {
    width: '200px',
  },
};

export default class ControlsRight extends PureComponent {

  static propTypes = {
    sessionId: PropTypes.number,
    switchToNormalMode: PropTypes.func.isRequired,
    switchToRealtimeMode: PropTypes.func.isRequired,
    switchToExtensibleMode: PropTypes.func.isRequired,
    switchToFixedMode: PropTypes.func.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timebarRealTime: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    masterTimeline: null,
    sessionId: null,
  }

  switchMode = (e) => {
    e.preventDefault();
    const {
      timebarUuid,
      timebarMode,
      switchToNormalMode,
      switchToRealtimeMode,
      switchToExtensibleMode,
      switchToFixedMode,
      sessionId,
    } = this.props;

    const mode = e.currentTarget.getAttribute('mode');

    if (mode === timebarMode) {
      return;
    }
    if (mode === 'Normal') {
      switchToNormalMode(timebarUuid);
    } else if (mode === 'Extensible') {
      switchToExtensibleMode(timebarUuid);
    } else if (mode === 'Fixed') {
      switchToFixedMode(timebarUuid);
    } else if (mode === 'Realtime') {
      // IPC request to get master session current time
      main.getSessionTime(sessionId, ({ err, timestamp }) => {
        if (err) {
          // TODO Show message
          return;
        }
        console.log('here');
        switchToRealtimeMode(timebarUuid, timestamp);
      });
    }
  }

  render() {
    const {
      timebarMode,
      timebarRealTime,
      sessionId,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    const realTimeDisabled = sessionId === null;
    let disabledTooltip;
    if (realTimeDisabled) {
      disabledTooltip = (
        <Tooltip
          id="RTTooltip"
          style={inlineStyles.width200}
        >
          <b>Cannot go realtime</b><br />
           No master timeline<br />
        </Tooltip>
      );
    }

    return (
      <div>
        <ul className={classnames(styles.controlsUl, styles.controlsUlRight)}>
          <li className={styles.controlsLi}>
            <button
              mode="Normal"
              className={classnames(
                allButtonsKlasses,
                {
                  [styles.controlButtonActive]: (timebarMode === 'Normal'),
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
                  [styles.controlButtonActive]: (timebarMode === 'Extensible'),
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
                  [styles.controlButtonActive]: (timebarMode === 'Fixed'),
                }
              )}
              onClick={this.switchMode}
              title="Fixed mode"
            >
              Fixed
            </button>
          </li>
          <li className={styles.controlsLi}>
            { realTimeDisabled && <OverlayTrigger
              trigger={OverlayTriggerTrigger}
              placement="top"
              overlay={disabledTooltip}
              container={this}
            >
              <span
                mode="Realtime"
                className={classnames(
                  allButtonsKlasses,
                  styles.controlButtonDisabled
                )}
              >
                Real time
              </span>
            </OverlayTrigger> }
            { !realTimeDisabled && <button
              mode="Realtime"
              id="realtime"
              className={classnames(
                allButtonsKlasses,
                {
                  [styles.controlButtonActive]: timebarRealTime,
                }
              )}
              onClick={this.switchMode}
            >
              Real time
            </button> }
          </li>
        </ul>
      </div>
    );
  }
}
