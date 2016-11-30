import React, { Component } from 'react';
import ControlsLeft from './ControlsLeft';
import ControlsRight from './ControlsRight';

export default class TimebarControls extends Component {
  render() {
    return (
      <div>
        <ControlsLeft {...this.props} />
        <ControlsRight {...this.props} />
      </div>
    );
  }
}
