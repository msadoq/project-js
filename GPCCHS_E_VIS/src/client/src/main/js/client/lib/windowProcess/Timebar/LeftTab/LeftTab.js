import classnames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import { Col, Glyphicon, Button } from 'react-bootstrap';
import Timeline from './Timeline';
import styles from './LeftTab.css';

export default class LeftTab extends PureComponent {
  static propTypes = {
    removeTimeline: PropTypes.func.isRequired,
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    unmountPageTimebar: PropTypes.func.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionName: PropTypes.string.isRequired,
      })
    ).isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        delta: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        missionEpoch: PropTypes.number.isRequired,
        timestamp: PropTypes.shape({
          ms: PropTypes.number,
          ps: PropTypes.number,
        }),
      })
    ).isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timebarName: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    masterId: PropTypes.string,
    verticalScroll: PropTypes.number.isRequired,
    openModal: PropTypes.func.isRequired,
  }

  static defaultProps = {
    masterId: null,
  }

  static contextTypes = {
    windowId: PropTypes.string,
  };

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  onWheel = (e) => {
    this.props.onTimelinesVerticalScroll(e, e.currentTarget);
  }

  willRemoveTimeline = (timebarUuid, timelineUuid) => {
    this.props.removeTimeline(timebarUuid, timelineUuid);
  }

  willAddTimeline = (e) => {
    if (e) {
      e.preventDefault();
    }
    const {
      openModal,
      timebarUuid,
    } = this.props;
    const {
      windowId,
    } = this.context;
    openModal(
      windowId,
      {
        type: 'addTimeline',
        opened: true,
        timebarUuid,
      }
    );
  }

  willEditTimeline = (uuid) => {
    const {
      timebarUuid,
      openModal,
    } = this.props;
    const {
      windowId,
    } = this.context;
    openModal(
      windowId,
      {
        type: 'editTimeline',
        opened: true,
        timebarUuid,
        timelineUuid: uuid,
      }
    );
  }

  detach = (e) => {
    e.preventDefault();
    this.props.unmountPageTimebar(this.props.pageId);
  }

  render() {
    const {
      timelines,
      masterId,
      sessions,
      timebarName,
      timebarUuid,
    } = this.props;

    let noTrack;
    if (timelines.length === 0) {
      noTrack = <h5 className="text-center"><br /><b>No track to display</b></h5>;
    }

    return (
      <Col
        xs={3}
        className={classnames(
          styles.leftTab,
          'subdiv'
        )}
      >
        <div className={styles.leftTabTopPanel}>
          <Button
            title="Detach timebar"
            bsSize="xs"
            onClick={this.detach}
            className={classnames('btn-transp', styles.btnClose)}
          >
            <Glyphicon
              glyph="remove"
            />
          </Button>
          <h5 className={styles.timebarName}>
            <b>{timebarName}</b>
          </h5>
          <Button
            title="Add timeline"
            bsSize="xs"
            onClick={this.willAddTimeline}
            className={classnames('btn-transp', styles.addTimelineButton)}
          >
            <Glyphicon
              glyph="plus"
            />
          </Button>
        </div>
        {noTrack}
        <ul
          ref={(el) => { this.timelinesEl = el; }}
          className={styles.timelineUl}
          onScroll={this.props.onTimelinesVerticalScroll}
          onWheel={this.onWheel}
        >
          { timelines && timelines.map((v) => {
            const session = Object.values(sessions).find(s => s.name === v.sessionName);
            return (
              <Timeline
                key={v.id}
                offset={v.offset}
                timelinesLength={timelines.length}
                timebarUuid={timebarUuid}
                id={v.id}
                uuid={v.uuid}
                color={v.color}
                masterId={masterId}
                willEditTimeline={this.willEditTimeline}
                removeTimeline={this.willRemoveTimeline}
                sessionName={session ? session.name : 'no session'}
              />
            );
          }
          )}
        </ul>
      </Col>
    );
  }
}
