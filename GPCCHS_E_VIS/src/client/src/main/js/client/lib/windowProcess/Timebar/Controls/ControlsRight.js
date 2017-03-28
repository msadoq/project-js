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
    switchToNormalMode: PropTypes.func.isRequired,
    switchToRealtimeMode: PropTypes.func.isRequired,
    switchToExtensibleMode: PropTypes.func.isRequired,
    switchToFixedMode: PropTypes.func.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timebarRealTime: PropTypes.bool.isRequired,
    currentSessionExists: PropTypes.bool.isRequired,
    masterTimelineExists: PropTypes.bool.isRequired,
    masterTimeline: PropTypes.shape({
      color: PropTypes.string,
      id: PropTypes.string.isRequired,
      kind: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
      sessionId: PropTypes.number.isRequired,
    }),
    masterSessionId: PropTypes.number.isRequired,
  }

  static defaultProps = {
    masterTimeline: null,
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
      currentSessionExists,
      masterTimeline,
      masterSessionId,
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
      let sessionId;
      if (currentSessionExists) {
        sessionId = masterTimeline.sessionId;
      } else {
        sessionId = masterSessionId;
      }
      main.getSessionTime(sessionId, ({ err, timestamp }) => {
        if (err) {
          // TODO Show message
          return;
        }
        switchToRealtimeMode(timebarUuid, timestamp);
      });
    }
  }

  render() {
    const {
      timebarMode,
      currentSessionExists,
      masterTimelineExists,
      timebarRealTime,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    const realTimeDisabled = !masterTimelineExists || !currentSessionExists;
    let disabledTooltip;
    if (realTimeDisabled) {
      disabledTooltip = (
        <Tooltip
          id="RTTooltip"
          style={inlineStyles.width200}
        >
          <b>Cannot go realtime</b><br />
          { !masterTimelineExists && 'No master timeline'}<br />
          { !currentSessionExists && 'No master session'}
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
