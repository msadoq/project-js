import { difference } from 'lodash';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { schemeCategory20b } from 'd3-scale';
import Timeline from './Timeline';
import EditTrack from './EditTrack';
import AddTrack from './AddTrack';
import styles from './Lefttab.css';

export default class Lefttab extends Component {
  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    sessions: React.PropTypes.array.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timebarName: React.PropTypes.string.isRequired,
    focusedPageId: React.PropTypes.string.isRequired,
    masterId: React.PropTypes.string,
    addAndMountTimeline: React.PropTypes.func.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    updateTimelineId: React.PropTypes.func.isRequired,
    updateMasterId: React.PropTypes.func.isRequired,
    updateOffset: React.PropTypes.func.isRequired,
    updateTimebarId: React.PropTypes.func.isRequired,
    verticalScroll: React.PropTypes.number.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      willAdd: false,
      willEdit: false,
      color: schemeCategory20b[this.props.timelines.length % 20],
      errorMessage: null
    };
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  onWheel = (e) => {
    this.props.onVerticalScroll(e, e.currentTarget);
  }

  setColor(color) {
    const { timelines } = this.props;
    const availableColors = difference(schemeCategory20b, timelines
      .map(x => x.color).concat(color));
    this.setState({
      color: availableColors[0] || schemeCategory20b[(timelines.length + 1) % 20]
    });
  }

  unmountTimelineAction = (timebarId, timelineId) => {
    const { color } = this.state;
    this.props.unmountTimeline(timebarId, timelineId);
    this.setColor(color);
  }

  toggleAddTimeline = (e) => {
    if (e) e.preventDefault();
    const { willAdd } = this.state;
    this.setState({ willAdd: !willAdd });
  }

  willAddTimeline = (kind, id, color, sessionId) => {
    const { timebarId } = this.props;
    this.props.addAndMountTimeline(
      timebarId,
      {
        kind,
        id,
        sessionId,
        color
      }
    );
    this.toggleAddTimeline();
    this.setColor(color);
  }

  hideEditTimeline = () => {
    this.setState({
      willAdd: false,
      willEdit: false,
      editingId: null
    });
  }

  willEditTimeline = (timelineId, id) => {
    this.setState({
      willAdd: false,
      willEdit: true,
      editingId: id
    });
  }

  editTimeline = (timelineId, id, offset, master) => {
    const { updateOffset, updateTimelineId, timebarId,
      updateMasterId, masterId, timelines } = this.props;
    const timeline = timelines.find(x => x.timelineId === timelineId);
    const { editingId } = this.state;

    if (timeline.id !== id) updateTimelineId(timelineId, id);

    if (master && masterId !== id) {
      updateMasterId(timebarId, editingId);
      timelines.forEach((t) => {
        if (t.timelineId === timelineId) return;
        updateOffset(t.timelineId, t.offset - offset);
      });
      updateOffset(timelineId, 0);
    } else if (timeline.offset !== offset) {
      if ((masterId === timelineId) || (master && masterId !== timelineId)) {
        timelines.forEach((t) => {
          if (t.timelineId === timelineId) return;
          updateOffset(t.timelineId, t.offset - offset);
        });
        updateOffset(timelineId, 0);
      } else {
        updateOffset(timelineId, offset);
      }
    }

    this.setState({
      willAdd: false,
      willEdit: false
    });
  }

  detach = (e) => {
    e.preventDefault();
    const { updateTimebarId, focusedPageId } = this.props;
    updateTimebarId(focusedPageId, null);
  }

  render() {
    const { timelines, masterId, sessions, timebarName } = this.props;
    const { color, willAdd, willEdit, editingId } = this.state;

    let noTrack;
    if (timelines.length === 0) {
      noTrack = <h5 className="text-center"><br /><b>No track to display</b></h5>;
    }

    let editTrack;
    const currentlyEditingTimeline = timelines.find(x => x.id === editingId);
    if (willEdit && currentlyEditingTimeline) {
      editTrack = (<EditTrack
        timeline={currentlyEditingTimeline}
        masterId={masterId}
        hideEditTimeline={this.hideEditTimeline}
        editTimeline={this.editTimeline}
      />);
    }

    let addTrack;
    if (willAdd) {
      addTrack = (<AddTrack
        timelines={timelines}
        color={color}
        sessions={sessions}
        onChange={this.willAddTimeline}
        toggleAddTimeline={this.toggleAddTimeline}
      />);
    }

    return (

      <div className={styles.leftTab}>
        <button
          className={classnames('btn', 'btn-xs', 'btn-control', styles.btnClose)}
          title="detach timebar and choose another one"
          onClick={this.detach}
        >x</button>
        <h5 className={styles.timebarName}>
          {timebarName}
        </h5>
        {editTrack}
        {addTrack}
        <Button
          bsSize="small"
          className={styles.addTimelineButton}
          ref={(el) => { this.toggleAddTimelineButtonEl = el; }}
          title="Add track"
          onClick={this.toggleAddTimeline}
          bsStyle="info"
        >
          +
        </Button>
        {noTrack}
        <ul
          ref={(el) => { this.timelinesEl = el; }}
          className={styles.timelineUl}
          onScroll={this.props.onVerticalScroll}
          onWheel={this.onWheel}
        >
          { timelines.map((v, i) =>
            <Timeline
              key={i}
              offset={v.offset}
              timelinesLength={timelines.length}
              timebarId={this.props.timebarId}
              id={v.id}
              timelineId={v.timelineId}
              color={v.color}
              masterId={masterId}
              willEditTimeline={this.willEditTimeline}
              unmountTimeline={this.unmountTimelineAction}
            />
          )}
        </ul>
      </div>
    );
  }
}
