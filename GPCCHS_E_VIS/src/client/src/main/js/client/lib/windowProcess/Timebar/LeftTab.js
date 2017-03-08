import classnames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import { Col, Glyphicon, Button } from 'react-bootstrap';
import { schemeCategory20b } from 'd3-scale';
import Timeline from './Timeline';
import Modal from '../common/Modal';
import EditTimeline from './timeline/EditTimeline';
import AddTimeline from './timeline/AddTimeline';
import styles from './Lefttab.css';
import { main } from '../ipc';

export default class LeftTab extends PureComponent {
  static propTypes = {
    collapseTimebar: PropTypes.func.isRequired,
    addNewTimeline: PropTypes.func.isRequired,
    unmountTimeline: PropTypes.func.isRequired,
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateId: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    updateMasterId: PropTypes.func.isRequired,
    updateOffset: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
    updateTimebarId: PropTypes.func.isRequired,
    timelines: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        id: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        timelineUuid: PropTypes.string.isRequired,
        offset: PropTypes.number.isRequired,
        sessionId: PropTypes.number.isRequired,
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
    focusedPageId: PropTypes.string.isRequired,
    masterId: PropTypes.string,
    verticalScroll: PropTypes.number.isRequired,
  }

  static defaultProps = {
    masterId: null,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      willAdd: false,
      willEdit: false,
    };
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  onWheel = (e) => {
    this.props.onTimelinesVerticalScroll(e, e.currentTarget);
  }

  willUnmountTimeline = (timebarUuid, timelineUuid) => {
    this.props.unmountTimeline(timebarUuid, timelineUuid);
  }

  toggleAddTimeline = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!this.state.willAdd) {
      // TODO send reload sessions request to main and on callback
      // refresh session list from DC before displaying form
      main.reloadSessions(() => {
        this.setState({ willAdd: true });
      });
    } else {
      this.setState({ willAdd: false });
    }
  }

  willAddTimeline = (values) => {
    const {
      timebarUuid,
      timelines,
      updateMasterId,
      addNewTimeline,
      updateOffset,
    } = this.props;

    const timelinesBeforeAdd = [].concat(timelines);

    addNewTimeline(
      timebarUuid,
      {
        kind: values.kind,
        id: values.id,
        sessionId: parseInt(values.sessionId, 10),
        color: values.color,
        offset: values.master ? 0 : parseInt(values.offset, 10),
      }
    );
    this.hideModals();

    if (values.master) {
      timelinesBeforeAdd.forEach(t =>
        updateOffset(t.timelineUuid, t.offset - values.offset)
      );
      updateMasterId(timebarUuid, values.id);
    }
  }

  hideModals = () => {
    this.setState({
      willAdd: false,
      willEdit: false,
      editingId: null,
    });
  }

  willEditTimeline = (timelineUuid, id) => {
    this.setState({
      willAdd: false,
      willEdit: true,
      editingId: id,
    });
  }

  editTimeline = (values) => {
    const {
      updateOffset,
      updateId,
      updateColor,
      timebarUuid,
      updateMasterId,
      masterId,
      timelines,
      updateSessionId,
    } = this.props;

    const timeline = timelines.find(x => x.timelineUuid === values.timelineUuid);
    const offset = parseInt(values.offset, 10);

    if (timeline.id !== values.id) {
      updateId(values.timelineUuid, values.id);
    }
    if (timeline.color !== values.color) {
      updateColor(values.timelineUuid, values.color);
    }
    if (timeline.sessionId !== parseInt(values.sessionId, 10)) {
      updateSessionId(values.timelineUuid, parseInt(values.sessionId, 10));
    }

    if (values.master && masterId !== values.id) {
      updateMasterId(timebarUuid, values.id);
      timelines.forEach((t) => {
        if (t.timelineUuid === values.timelineUuid) {
          return;
        }
        updateOffset(t.timelineUuid, t.offset - offset);
      });
      updateOffset(values.timelineUuid, 0);
    } else if (timeline.offset !== offset) {
      if ((masterId === values.id) || (values.master && masterId !== values.id)) {
        timelines.forEach((t) => {
          if (t.timelineUuid === values.timelineUuid) {
            return;
          }
          updateOffset(t.timelineUuid, t.offset - offset);
        });
        updateOffset(values.timelineUuid, 0);
      } else {
        updateOffset(values.timelineUuid, offset);
      }
    }
    this.hideModals();
  }

  detach = (e) => {
    e.preventDefault();
    this.props.updateTimebarId(this.props.focusedPageId, null);
  }

  collapse = (e) => {
    e.preventDefault();
    this.props.collapseTimebar(this.props.focusedPageId, true);
  }

  render() {
    const {
      timelines,
      masterId,
      sessions,
      timebarName,
      timebarUuid,
    } = this.props;
    const {
      willAdd,
      willEdit,
      editingId,
    } = this.state;

    let noTrack;
    if (timelines.length === 0) {
      noTrack = <h5 className="text-center"><br /><b>No track to display</b></h5>;
    }
    const currentlyEditingTimeline = timelines.find(x => x.id === editingId);

    const editTrack = (
      <Modal
        title="Edit timeline"
        isOpened={currentlyEditingTimeline && willEdit}
        onClose={this.hideModals}
      >
        {currentlyEditingTimeline && <EditTimeline
          form={`timebar-${timebarUuid}-editTrack`}
          onSubmit={this.editTimeline}
          sessions={sessions}
          timelines={timelines}
          masterId={masterId}
          id={currentlyEditingTimeline.id}
          timelineUuid={currentlyEditingTimeline.timelineUuid}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          initialValues={{
            master: masterId === currentlyEditingTimeline.id,
            id: currentlyEditingTimeline.id,
            color: currentlyEditingTimeline.color,
            kind: currentlyEditingTimeline.kind,
            sessionId: typeof currentlyEditingTimeline.sessionId === 'number' ?
              currentlyEditingTimeline.sessionId.toString() : '',
            timelineUuid: currentlyEditingTimeline.timelineUuid,
            offset: currentlyEditingTimeline.offset,
          }}
        />}
      </Modal>
    );

    const addTrack = (
      <Modal
        title="Add timeline"
        isOpened={willAdd}
        onClose={this.toggleAddTimeline}
      >
        <AddTimeline
          form={`timebar-${timebarUuid}-addTrack`}
          sessions={sessions}
          timelines={timelines}
          onSubmit={this.willAddTimeline}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          initialValues={{
            id: '',
            color: schemeCategory20b[timelines.length % 20],
            kind: 'session',
            sessionId: typeof sessions[0].id === 'number' ?
              sessions[0].id.toString() : '',
            offset: 0,
            master: false,
          }}
        />
      </Modal>
    );

    return (
      <Col
        xs={3}
        className={classnames(
          styles.leftTab,
          'subdiv'
        )}
      >
        <div className={styles.leftTabTopPanel}>
          {editTrack}
          {addTrack}
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
          <Button
            title="Collapse timebar"
            bsSize="xs"
            onClick={this.collapse}
            className={classnames('btn-transp', styles.btnCollapse)}
          >
            <Glyphicon
              glyph="minus"
            />
          </Button>
          <h5 className={styles.timebarName}>
            <b>{timebarName}</b>
          </h5>
          <Button
            title="Add timeline"
            bsSize="xs"
            onClick={this.toggleAddTimeline}
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
            const session = Object.values(sessions).find(s => s.id === v.sessionId);
            return (
              <Timeline
                key={v.id}
                offset={v.offset}
                timelinesLength={timelines.length}
                timebarUuid={timebarUuid}
                id={v.id}
                timelineUuid={v.timelineUuid}
                color={v.color}
                masterId={masterId}
                willEditTimeline={this.willEditTimeline}
                unmountTimeline={this.willUnmountTimeline}
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
