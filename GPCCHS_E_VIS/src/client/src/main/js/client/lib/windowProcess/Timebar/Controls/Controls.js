import React, { PureComponent, PropTypes } from 'react';
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
    sessionId: PropTypes.number,
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
    masterSessionId: null,
    sessionId: null,
    messages: [],
  }

  render() {
    return (
      <div
        className={styles.controls}
      >
        <ControlsLeft
          sessionId={this.props.sessionId}
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
          sessionId={this.props.sessionId}
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
