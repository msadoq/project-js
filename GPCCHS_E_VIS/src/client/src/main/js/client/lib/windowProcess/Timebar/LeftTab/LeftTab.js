// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Reorganized files and folders in windowProcess/Timebar
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : VIMA does not crash when sessions list is empty.
// VERSION : 1.1.2 : DM : #6302 : 06/04/2017 : Fix some lint errors, added justification and DV6 TBC_CNES prefix on others.
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 13/04/2017 : Lint errors fixes and useless props removed in LeftTab / AddTimelineWrapper.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : FA : #7256 : 20/07/2017 : Working on cleaning style, added variables to edit style easily.
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

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
        // delta: PropTypes.number.isRequired,
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
          'LeftTab',
          styles.leftTab
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
          <h5 className={classnames('timebarName', styles.timebarName)}>
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
