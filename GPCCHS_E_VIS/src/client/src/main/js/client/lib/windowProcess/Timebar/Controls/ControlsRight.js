// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Fix / refacto and test timebar controls components
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : fix lint warnings about proptypes in timebar controls
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player middleware
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Use getCurrentSessionExists selector in ControlsContainer
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove unused commented line in ControlsLeft component
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Added theme variables linked to main areas.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './Controls.css';

const OverlayTriggerTrigger = ['hover', 'focus'];

const inlineStyles = {
  width200: {
    width: '200px',
  },
};

export default class ControlsRight extends PureComponent {

  static propTypes = {
    enableRealTime: PropTypes.bool.isRequired,
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
    }
  }

  render() {
    const {
      timebarMode,
      timebarRealTime,
      enableRealTime,
    } = this.props;

    const allButtonsKlasses = classnames('btn', 'btn-xs', 'btn-control');

    const realTimeDisabled = !enableRealTime;
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
                  active: (timebarMode === 'Normal'),
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
                  active: (timebarMode === 'Extensible'),
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
                  active: (timebarMode === 'Fixed'),
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
                  active: timebarRealTime,
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
