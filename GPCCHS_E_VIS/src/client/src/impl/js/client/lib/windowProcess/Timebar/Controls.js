import React, { PureComponent, PropTypes } from 'react';
import ControlsLeft from './ControlsLeft';
import ControlsRight from './ControlsRight';

export default class Controls extends PureComponent {

  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    updateSpeed: PropTypes.func.isRequired,
    toggleTimesetter: PropTypes.func.isRequired,
    restoreWidth: PropTypes.func.isRequired,
    goNow: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    messages: PropTypes.array,
    timebarId: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarSpeed: PropTypes.number.isRequired,
    currentSessionExists: PropTypes.bool.isRequired,
    switchToNormalMode: PropTypes.func.isRequired,
    switchToRealtimeMode: PropTypes.func.isRequired,
    switchToExtensibleMode: PropTypes.func.isRequired,
    switchToFixedMode: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <ControlsLeft
          isPlaying={this.props.isPlaying}
          play={this.props.play}
          pause={this.props.pause}
          updateSpeed={this.props.updateSpeed}
          toggleTimesetter={this.props.toggleTimesetter}
          restoreWidth={this.props.restoreWidth}
          goNow={this.props.goNow}
          jump={this.props.jump}
          messages={this.props.messages}
          timebarId={this.props.timebarId}
          timebarSpeed={this.props.timebarSpeed}
        />
        <ControlsRight
          play={this.props.play}
          switchToNormalMode={this.props.switchToNormalMode}
          switchToRealtimeMode={this.props.switchToRealtimeMode}
          switchToExtensibleMode={this.props.switchToExtensibleMode}
          switchToFixedMode={this.props.switchToFixedMode}
          timebarMode={this.props.timebarMode}
          timebarId={this.props.timebarId}
          currentSessionExists={this.props.currentSessionExists}
        />
      </div>
    );
  }
}
