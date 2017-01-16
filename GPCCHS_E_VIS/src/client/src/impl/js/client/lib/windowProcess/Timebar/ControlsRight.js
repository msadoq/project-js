import React, { PureComponent, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Controls.css';

export default class ControlsRight extends PureComponent {

  static propTypes = {
    play: PropTypes.func.isRequired,
    switchToNormalMode: PropTypes.func.isRequired,
    switchToRealtimeMode: PropTypes.func.isRequired,
    switchToExtensibleMode: PropTypes.func.isRequired,
    switchToFixedMode: PropTypes.func.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    currentSessionExists: PropTypes.bool.isRequired,
    masterTimelineExists: PropTypes.bool.isRequired,
  }

  switchMode = (e) => {
    e.preventDefault();
    if (e.currentTarget.getAttribute('realTimeDisabled')) {
      return;
    }

    const {
      timebarUuid,
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
      switchToNormalMode(timebarUuid);
    } else if (mode === 'Extensible') {
      switchToExtensibleMode(timebarUuid);
    } else if (mode === 'Fixed') {
      switchToFixedMode(timebarUuid);
    } else if (mode === 'Realtime') {
      switchToRealtimeMode(timebarUuid);
      play(timebarUuid);
    }
  }

  render() {
    const {
      timebarMode,
      currentSessionExists,
      masterTimelineExists,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    const realTimeDisabled = !masterTimelineExists || !currentSessionExists;
    let disabledTooltip;
    if (realTimeDisabled) {
      disabledTooltip = (
        <Tooltip
          id="RTTooltip"
          style={{ width: '200px' }}
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
            { realTimeDisabled && <OverlayTrigger
              trigger={['hover', 'focus']}
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
              className={classnames(
                allButtonsKlasses,
                {
                  [styles.controlButtonActive]: (timebarMode === 'Realtime'),
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
