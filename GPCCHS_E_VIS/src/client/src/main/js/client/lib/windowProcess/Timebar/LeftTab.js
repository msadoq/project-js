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
    addAndMountTimeline: PropTypes.func.isRequired,
    unmountTimeline: PropTypes.func.isRequired,
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateId: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    updateMasterId: PropTypes.func.isRequired,
    updateOffset: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
    updateTimebarId: PropTypes.func.isRequired,
    timelines: PropTypes.array.isRequired,
    sessions: PropTypes.array.isRequired,
    timebarUuid: PropTypes.string.isRequired,
    timebarName: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    masterId: PropTypes.string,
    verticalScroll: PropTypes.number.isRequired,
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

  willUnmountTimeline = (timebarUuid, timelineId) => {
    this.props.unmountTimeline(timebarUuid, timelineId);
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
      addAndMountTimeline,
      updateOffset,
    } = this.props;

    const timelinesBeforeAdd = [].concat(timelines);

    addAndMountTimeline(
      timebarUuid,
      {
        kind: values.kind,
        id: values.id,
        sessionId: parseInt(values.sessionId, 10),
        color: values.color,
        offset: values.master ? 0 : parseInt(values.offset, 10),
      }
    );
    this.setState({
      willAdd: false,
    });

    if (values.master) {
      timelinesBeforeAdd.forEach(t =>
        updateOffset(t.timelineId, t.offset - values.offset)
      );
      updateMasterId(timebarUuid, values.id);
    }
  }

  hideModals = () => {
    this.setState({
      willAdd: false,
      willEdit: false,
    });
  }

  willEditTimeline = (timelineId, id) => {
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

    const timeline = timelines.find(x => x.timelineId === values.timelineId);
    const offset = parseInt(values.offset, 10);

    if (timeline.id !== values.id) {
      updateId(values.timelineId, values.id);
    }
    if (timeline.color !== values.color) {
      updateColor(values.timelineId, values.color);
    }
    if (timeline.sessionId !== parseInt(values.sessionId, 10)) {
      updateSessionId(values.timelineId, parseInt(values.sessionId, 10));
    }

    if (values.master && masterId !== values.id) {
      updateMasterId(timebarUuid, values.id);
      timelines.forEach((t) => {
        if (t.timelineId === values.timelineId) {
          return;
        }
        updateOffset(t.timelineId, t.offset - offset);
      });
      updateOffset(values.timelineId, 0);
    } else if (timeline.offset !== offset) {
      if ((masterId === values.id) || (values.master && masterId !== values.id)) {
        timelines.forEach((t) => {
          if (t.timelineId === values.timelineId) {
            return;
          }
          updateOffset(t.timelineId, t.offset - offset);
        });
        updateOffset(values.timelineId, 0);
      } else {
        updateOffset(values.timelineId, offset);
      }
    }
    this.setState({ editingId: null });
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
          timelineId={currentlyEditingTimeline.timelineId}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          initialValues={{
            master: masterId === currentlyEditingTimeline.id,
            id: currentlyEditingTimeline.id,
            color: currentlyEditingTimeline.color,
            kind: currentlyEditingTimeline.kind,
            sessionId: typeof currentlyEditingTimeline.sessionId === 'number' ?
              currentlyEditingTimeline.sessionId.toString() : '',
            timelineId: currentlyEditingTimeline.timelineId,
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
          { timelines.map(v =>
            <Timeline
              key={v.i}
              offset={v.offset}
              timelinesLength={timelines.length}
              timebarUuid={timebarUuid}
              id={v.id}
              timelineId={v.timelineId}
              color={v.color}
              masterId={masterId}
              willEditTimeline={this.willEditTimeline}
              unmountTimeline={this.willUnmountTimeline}
            />
          )}
        </ul>
      </Col>
    );
  }
}
