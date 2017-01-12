import classnames from 'classnames';
import _difference from 'lodash/difference';
import React, { Component, PropTypes } from 'react';
import { Button, Col, Glyphicon } from 'react-bootstrap';
import { schemeCategory20b } from 'd3-scale';
import Timeline from './Timeline';
import Modal from '../common/Modal';
import EditTrack from './EditTrack';
import AddTrack from './AddTrack';
import styles from './Lefttab.css';
import { main } from '../ipc';

export default class LeftTab extends Component {
  static propTypes = {
    addAndMountTimeline: PropTypes.func.isRequired,
    unmountTimeline: PropTypes.func.isRequired,
    onTimelinesVerticalScroll: PropTypes.func.isRequired,
    updateId: PropTypes.func.isRequired,
    updateMasterId: PropTypes.func.isRequired,
    updateOffset: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
    updateTimebarId: PropTypes.func.isRequired,
    timelines: PropTypes.array.isRequired,
    sessions: PropTypes.array.isRequired,
    timebarId: PropTypes.string.isRequired,
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
      color: schemeCategory20b[this.props.timelines.length % 20],
      errorMessage: null,
    };
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  onWheel = (e) => {
    this.props.onTimelinesVerticalScroll(e, e.currentTarget);
  }

  // Set auto color for the next track to be added
  setColor(color) {
    const availableColors = _difference(schemeCategory20b, this.props.timelines
      .map(x => x.color).concat(color));
    this.setState({
      color: availableColors[0] || schemeCategory20b[(this.props.timelines.length + 1) % 20]
    });
  }

  willUnmountTimeline = (timebarId, timelineId) => {
    this.props.unmountTimeline(timebarId, timelineId);
    this.setColor(this.state.color);
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

  willAddTimeline = (kind, id, color, sessionId) => {
    this.props.addAndMountTimeline(
      this.props.timebarId,
      {
        kind,
        id,
        sessionId,
        color,
      }
    );
    this.setColor(color);
  }

  hideEditTimeline = () => {
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

  editTimeline = (timelineId, id, offset, master, sessionId) => {
    const {
      updateOffset,
      updateId,
      timebarId,
      updateMasterId,
      masterId,
      timelines,
      updateSessionId,
    } = this.props;
    const { editingId } = this.state;
    const timeline = timelines.find(x => x.timelineId === timelineId);

    if (timeline.id !== id) updateId(timelineId, id);
    if (timeline.sessionId !== sessionId) updateSessionId(timelineId, sessionId);
    if (master && masterId !== id) {
      updateMasterId(timebarId, editingId);
      timelines.forEach((t) => {
        if (t.timelineId === timelineId) {
          return;
        }
        updateOffset(t.timelineId, t.offset - offset);
      });
      updateOffset(timelineId, 0);
    } else if (timeline.offset !== offset) {
      if ((masterId === timelineId) || (master && masterId !== timelineId)) {
        timelines.forEach((t) => {
          if (t.timelineId === timelineId) {
            return;
          }
          updateOffset(t.timelineId, t.offset - offset);
        });
        updateOffset(timelineId, 0);
      } else {
        updateOffset(timelineId, offset);
      }
    }
  }

  detach = (e) => {
    e.preventDefault();
    this.props.updateTimebarId(this.props.focusedPageId, null);
  }

  render() {
    const {
      timelines,
      masterId,
      sessions,
      timebarName,
      timebarId,
    } = this.props;
    const {
      color,
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
        title="Edit track"
        isOpened={currentlyEditingTimeline && willEdit}
        onClose={this.hideEditTimeline}
      >
        {currentlyEditingTimeline && <EditTrack
          timeline={currentlyEditingTimeline}
          masterId={masterId}
          sessions={sessions}
          editTimeline={this.editTimeline}
          onClose={this.hideEditTimeline}
        />}
      </Modal>
    );

    const addTrack = (
      <Modal
        title="Add track"
        isOpened={willAdd}
        onClose={this.toggleAddTimeline}
      >
        <AddTrack
          timelines={timelines}
          color={color}
          sessions={sessions}
          onChange={this.willAddTimeline}
          onClose={this.toggleAddTimeline}
          bodyComponent={AddTrack}
        />
      </Modal>
    );

    return (
      <Col xs={3} className={styles.leftTab}>
        <div className={styles.leftTabTopPanel}>
          <Button
            bsSize="small"
            className={classnames(styles.btnClose, 'btn-control')}
            title="detach timebar and choose another one"
            onClick={this.detach}
            bsStyle="default"
          >
            <Glyphicon glyph="remove" />
          </Button>
          <h5 className={styles.timebarName}>
            <u><b>{timebarName}</b></u>
          </h5>
          {editTrack}
          {addTrack}
          <Button
            bsSize="small"
            className={styles.addTimelineButton}
            title="Add track"
            onClick={this.toggleAddTimeline}
            bsStyle="info"
          >
            <Glyphicon glyph="plus" />
          </Button>
        </div>
        {noTrack}
        <ul
          ref={(el) => { this.timelinesEl = el; }}
          className={styles.timelineUl}
          onScroll={this.props.onTimelinesVerticalScroll}
          onWheel={this.onWheel}
        >
          { timelines.map((v, i) =>
            <Timeline
              key={i}
              offset={v.offset}
              timelinesLength={timelines.length}
              timebarId={timebarId}
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
