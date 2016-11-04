import React, { PureComponent } from 'react';
import styles from './Timebar.css';

export default class TimebarTimeline extends PureComponent {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    color: React.PropTypes.string
  }

  render() {
    const { color } = this.props;
    return (
      <div
        className={styles.timeline}
        style={{ background: (color ? `hsl(${color})` : '#31b0d5') }}
      >
        <div className={styles.timelineInfos}>{this.props.name}</div>
      </div>
    );
  }
}
