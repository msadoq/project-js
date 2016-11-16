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

  render() {
    const { color, willEditTimeline, timelineId,
      id, masterId, offset } = this.props;

    return (
      <li
        className={classnames(styles.timeline, { [styles.master]: (id === masterId) })}
        onDoubleClick={willEditTimeline.bind(null, timelineId, id)}
      >
        {id}{`  offset : ${offset === 0 ? '0' : moment.duration(offset).humanize()}`}
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
