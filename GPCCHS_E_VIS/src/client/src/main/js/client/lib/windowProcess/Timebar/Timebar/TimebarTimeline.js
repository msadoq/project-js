import React, { PureComponent, PropTypes } from 'react';
import styles from './Timebar.css';

export default class TimebarTimeline extends PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    offset: PropTypes.number.isRequired,
    viewportMsWidth: PropTypes.number.isRequired,
  }

  static defaultProps = {
    color: '#31b0d5',
  }

  render() {
    const {
      offset,
      viewportMsWidth,
      color,
      name,
    } = this.props;

    return (
      <div
        className={styles.timeline}
        style={{ background: color || '#31b0d5' }}
      >
        <div className={styles.timelineInfos}>{name}</div>
        { offset !== 0 &&
          <span
            className={styles.timelineOffset}
            style={{
              width: `${(100 * Math.abs(offset)) / viewportMsWidth}%`,
              left: offset < 0 ? '50%' : 'auto',
              right: offset > 0 ? '50%' : 'auto',
            }}
          />
        }
      </div>
    );
  }
}
