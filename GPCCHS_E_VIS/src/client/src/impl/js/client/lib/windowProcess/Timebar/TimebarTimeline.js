import React, { Component } from 'react';
import styles from './Timebar.css';

export default class TimebarTimeline extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    timebarId: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <div
        className={styles.timeline}
        style={{ background: (this.props.color ? `hsl(${this.props.color})` : '#31b0d5') }}
      >
        <div className={styles.timelineInfos}>
          {this.props.name}
        </div>
      </div>
    );
  }
}
