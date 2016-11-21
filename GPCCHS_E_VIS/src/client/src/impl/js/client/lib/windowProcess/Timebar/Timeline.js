import React, { PureComponent } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import styles from './Lefttab.css';

export default class Timeline extends PureComponent {
  static propTypes = {
    offset: React.PropTypes.number.isRequired,
    id: React.PropTypes.string.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timelineId: React.PropTypes.string.isRequired,
    timelinesLength: React.PropTypes.number.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
    willEditTimeline: React.PropTypes.func.isRequired,
    color: React.PropTypes.string,
    masterId: React.PropTypes.string
  }

  willUnmountTimeline = (e) => {
    e.preventDefault();
    const { masterId, timelineId, id, timelinesLength, unmountTimeline, timebarId } = this.props;
    if (id !== masterId || timelinesLength === 1) {
      unmountTimeline(timebarId, timelineId);
    }
  }

  fi = (i, l = 2) => i.toString().padStart(l, '0');

  formatDuration = () => {
    const { offset } = this.props;
    const { fi } = this;
    let ms = moment.duration(offset).asMilliseconds();
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
    const { color, willEditTimeline, timelineId,
      id, masterId, offset } = this.props;

    let formattedOffset;
    if (offset !== 0) {
      formattedOffset = (
        <span className={styles.offset}>
          {this.formatDuration()}
        </span>);
    }
    return (
      <li
        className={classnames(styles.timeline, { [styles.master]: (id === masterId) })}
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
