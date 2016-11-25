import React, { PureComponent, PropTypes } from 'react';
import styles from './Timebar.css';

export default class TimebarTimeline extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }

  render() {
    return (
      <div
        className={styles.timeline}
        style={{ background: this.props.color || '#31b0d5' }}
      >
        <div className={styles.timelineInfos}>{this.props.name}</div>
      </div>
    );
  }
}
