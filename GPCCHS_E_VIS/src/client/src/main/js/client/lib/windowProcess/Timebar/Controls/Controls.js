// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : Timesetter is displayed with GenericModal component.
// VERSION : 1.1.2 : DM : #5828 : 11/05/2017 : Fix / refacto and test timebar controls components
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : fix lint warnings about proptypes in timebar controls
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Use getCurrentSessionExists selector in ControlsContainer
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import ControlsLeft from './ControlsLeft';
import ControlsRight from './ControlsRight';
import styles from './Controls.css';

export default class Controls extends PureComponent {

  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    timebarRealTime: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    restoreWidth: PropTypes.func.isRequired,
    goNow: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    enableRealTime: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    timebarUuid: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarSpeed: PropTypes.number.isRequired,
    switchToNormalMode: PropTypes.func.isRequired,
    switchToRealtimeMode: PropTypes.func.isRequired,
    switchToExtensibleMode: PropTypes.func.isRequired,
    switchToFixedMode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    messages: [],
  }

  render() {
    return (
      <div
        className={classnames(styles.controls, 'Controls')}
      >
        <ControlsLeft
          enableRealTime={this.props.enableRealTime}
          isPlaying={this.props.isPlaying}
          play={this.props.play}
          pause={this.props.pause}
          updateSpeed={this.props.updateSpeed}
          restoreWidth={this.props.restoreWidth}
          goNow={this.props.goNow}
          jump={this.props.jump}
          messages={this.props.messages}
          timebarUuid={this.props.timebarUuid}
          timebarSpeed={this.props.timebarSpeed}
          openModal={this.props.openModal}
        />
        <ControlsRight
          enableRealTime={this.props.enableRealTime}
          switchToNormalMode={this.props.switchToNormalMode}
          switchToRealtimeMode={this.props.switchToRealtimeMode}
          switchToExtensibleMode={this.props.switchToExtensibleMode}
          switchToFixedMode={this.props.switchToFixedMode}
          timebarMode={this.props.timebarMode}
          timebarUuid={this.props.timebarUuid}
          timebarRealTime={this.props.timebarRealTime}
        />
      </div>
    );
  }
}
