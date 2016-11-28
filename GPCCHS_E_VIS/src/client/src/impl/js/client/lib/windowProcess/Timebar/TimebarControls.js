import React, { Component } from 'react';
import TimebarControlsLeft from './TimebarControlsLeft';
import TimebarControlsRight from './TimebarControlsRight';

export default class TimebarControls extends Component {
  render() {
    return (
      <div>
        <TimebarControlsLeft {...this.props} />
        <TimebarControlsRight {...this.props} />
      </div>
    );
  }
}
