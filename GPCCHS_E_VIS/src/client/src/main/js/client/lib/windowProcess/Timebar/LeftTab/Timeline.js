// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// END-HISTORY
// ====================================================================

import React, { PureComponent, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { formatDuration } from 'windowProcess/common/timeFormats';
import styles from './LeftTab.css';

export default class Timeline extends PureComponent {
  static propTypes = {
    removeTimeline: PropTypes.func.isRequired,
    willEditTimeline: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    color: PropTypes.string,
    masterId: PropTypes.string,
    offset: PropTypes.number.isRequired,
    timelinesLength: PropTypes.number.isRequired,
    sessionName: PropTypes.string.isRequired,
  }

  static defaultProps = {
    color: '#31b0d5',
    masterId: null,
  }

  willRemoveTimeline = (e) => {
    e.preventDefault();
    const {
      masterId,
      uuid,
      id,
      timelinesLength,
      removeTimeline,
      timebarUuid,
    } = this.props;
    if (id !== masterId || timelinesLength === 1) {
      removeTimeline(timebarUuid, uuid);
    }
  }

  willEditTimeline = (e) => {
    e.preventDefault();
    const {
      uuid,
      willEditTimeline,
    } = this.props;
    willEditTimeline(uuid);
  }

  render() {
    const {
      color,
      id,
      masterId,
      offset,
      timelinesLength,
      sessionName,
    } = this.props;

    const isMaster = id === masterId;

    let formattedOffset;
    if (offset !== 0) {
      formattedOffset = (
        <span
          className={styles.offset}
          title="Formatted offset HH:MM:ss:SSS"
        >
          {formatDuration(offset)}
        </span>
      );
    }

    let removeButton;
    if (!isMaster || timelinesLength === 1) {
      removeButton = (
        <button
          className={styles.deleteButton}
          title="Remove this track"
          onClick={this.willRemoveTimeline}
        >
          <Glyphicon glyph="trash" />
        </button>
      );
    }

    const updateButton = (
      <button
        className={styles.editButton}
        title="Upate this track"
        onClick={this.willEditTimeline}
        style={{
          right: (isMaster && timelinesLength !== 1) ? '0px' : '26px',
        }}
      >
        <Glyphicon glyph="edit" />
      </button>
    );

    return (
      <li
        className={styles.timeline}
      >
        { isMaster ? <span className={styles.master} title="Master timeline">M</span> : null}
        <span
          style={{
            paddingLeft: isMaster ? '20px' : '0px',
          }}
        >{id} | {sessionName}</span>
        {formattedOffset}
        <span
          className={styles.square}
          style={{
            background: color || '#31b0d5',
            right: (isMaster && timelinesLength !== 1) ? '26px' : '52px',
          }}
        />
        {updateButton}
        {removeButton}
      </li>
    );
  }
}
