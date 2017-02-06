import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';
import _memoize from 'lodash/memoize';
import styles from './Lefttab.css';

export default class Timeline extends PureComponent {
  static propTypes = {
    unmountTimeline: PropTypes.func.isRequired,
    willEditTimeline: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timelineId: PropTypes.string.isRequired,
    color: PropTypes.string,
    masterId: PropTypes.string,
    offset: PropTypes.number.isRequired,
    timelinesLength: PropTypes.number.isRequired,
  }

  static defaultProps = {
    color: '#31b0d5',
    masterId: null,
  }

  willUnmountTimeline = (e) => {
    e.preventDefault();
    const {
      masterId,
      timelineId,
      id,
      timelinesLength,
      unmountTimeline,
      timebarUuid,
    } = this.props;
    if (id !== masterId || timelinesLength === 1) {
      unmountTimeline(timebarUuid, timelineId);
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
    return `${neg ? '- ' : '+ '}${fi(h)}:${fi(m)}:${fi(s)}.${fi(ms, 3)}`;
  }

  willEditTimeline = _memoize(
    (timelineId, id) => () => this.props.willEditTimeline(timelineId, id),
    (...args) => JSON.stringify(args)
  );

  render() {
    const {
      color,
      timelineId,
      id,
      masterId,
      offset,
      timelinesLength,
    } = this.props;

    const isMaster = id === masterId;

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

    let removeButton;
    if (!isMaster || timelinesLength === 1) {
      removeButton = (
        <button
          className={styles.deleteButton}
          title="Remove this track"
          onClick={this.willUnmountTimeline}
        >
          -
        </button>
      );
    }
    return (
      <li
        className={styles.timeline}
        title="Click to edit track"
        onClick={this.willEditTimeline(timelineId, id)}
      >
        { isMaster ? <span className={styles.master} title="Master timeline">M</span> : null}
        <span
          style={{
            paddingLeft: isMaster ? '20px' : '0px',
          }}
        >{id}</span>
        {formattedOffset}
        <span
          className={styles.square}
          style={{
            background: color || '#31b0d5',
            right: (isMaster && timelinesLength !== 1) ? '0px' : '16px',
          }}
        />
        {removeButton}
      </li>
    );
  }
}
