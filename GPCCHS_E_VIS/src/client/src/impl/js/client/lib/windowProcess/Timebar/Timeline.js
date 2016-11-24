import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import styles from './Lefttab.css';

export default class Timeline extends PureComponent {
  static propTypes = {
    unmountTimeline: PropTypes.func.isRequired,
    willEditTimeline: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    timelineId: PropTypes.string.isRequired,
    color: PropTypes.string,
    masterId: PropTypes.string,
    offset: PropTypes.number.isRequired,
    timelinesLength: PropTypes.number.isRequired,
  }

  willUnmountTimeline = (e) => {
    e.preventDefault();
    const {
      masterId,
      timelineId,
      id,
      timelinesLength,
      unmountTimeline,
      timebarId
    } = this.props;
    if (id !== masterId || timelinesLength === 1) {
      unmountTimeline(timebarId, timelineId);
    }
  }

  fi = (i, l = 2) => i.toString().padStart(l, '0');

  formatDuration = () => {
    const { fi } = this;
    let ms = moment.duration(this.props.offset).asMilliseconds();
    const neg = ms < 0;
    if (neg) ms = Math.abs(ms);
    const h = Math.floor(ms / 3600000);
    ms -= h * 3600000;
    const m = Math.floor(ms / 60000);
    ms -= m * 60000;
    const s = Math.floor(ms / 1000);
    ms -= s * 1000;
    return `${neg ? '-' : ''}${fi(h)}:${fi(m)}:${fi(s)}.${fi(ms, 3)}`;
  }

  render() {
    const {
      color,
      willEditTimeline,
      timelineId,
      id,
      masterId,
      offset
    } = this.props;

    let formattedOffset;
    if (offset !== 0) {
      formattedOffset = (
        <span
          className={styles.offset}
          title="Formatted offset HH:MM:ss:SSS"
        >
          {this.formatDuration()}
        </span>
      );
    }
    return (
      <li
        className={classnames(
          styles.timeline,
          { [styles.master]: (id === masterId) }
        )}
        title="Double-click to edit track"
        onDoubleClick={willEditTimeline.bind(null, timelineId, id)}
      >
        {id}
        {formattedOffset}
        <span
          className={styles.square}
          style={{
            background: color || '#31b0d5'
          }}
        />
        <button
          className={styles.deleteButton}
          title="Remove this track"
          onClick={this.willUnmountTimeline}
        >
          -
        </button>
      </li>
    );
  }
}
