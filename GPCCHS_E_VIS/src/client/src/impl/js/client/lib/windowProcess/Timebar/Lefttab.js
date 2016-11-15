import { difference } from 'lodash';
import classnames from 'classnames';
import React, { Component } from 'react';
import { Button, FormGroup, Form } from 'react-bootstrap';
import { schemeCategory20b } from 'd3-scale';
import Timeline from './Timeline';
import EditTrack from './EditTrack';
import styles from './Lefttab.css';
import ColorPicker from '../Editor/Components/ColorPicker';

export default class Lefttab extends Component {
  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timebarName: React.PropTypes.string.isRequired,
    masterId: React.PropTypes.string.isRequired,
    addAndMountTimeline: React.PropTypes.func.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    updateTimelineId: React.PropTypes.func.isRequired,
    updateMasterId: React.PropTypes.func.isRequired,
    updateOffset: React.PropTypes.func.isRequired,
    verticalScroll: React.PropTypes.number.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      willAdd: false,
      willEdit: false,
      color: schemeCategory20b[this.props.timelines.length % 20]
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

  colorChosen = (c) => {
    this.setState({ color: c });
  }

  submitForm = (e) => {
    if (e.charCode === 13 && this.state.willAdd) {
      this.willAddTimeline(e);
    }
  }

  toggleAddTimeline = (e) => {
    if (e) e.preventDefault();
    const { willAdd } = this.state;
    this.setState({ willAdd: !willAdd });
    if (willAdd) {
      document.removeEventListener('keypress', this.submitForm);
    } else {
      document.addEventListener('keypress', this.submitForm);
    }
  }

  willAddTimeline = (e) => {
    e.preventDefault();
    const { color } = this.state;
    this.props.addAndMountTimeline(
      this.props.timebarId,
      {
        kind: this.newTimelineKindEl.value,
        id: this.newTimelineIdEl.value,
        color
      });
    this.setColor(color);
    this.toggleAddTimeline();
  }

  hideAddTimeline = () => {
    this.setState({
      willAdd: false,
      willEdit: false,
      editingTimelineId: null
    });
  }

  willEditTimeline = (timelineId, id) => {
    this.setState({
      willAdd: false,
      willEdit: true,
      editingTimelineId: timelineId,
      editingId: id
    });
  }

  editTimeline = (timelineId, id, offset, master) => {
    const { updateOffset, updateTimelineId, timebarId,
      updateMasterId, masterId, timelines } = this.props;
    const timeline = timelines.find(x => x.timelineId === timelineId);
    const { editingTimelineId } = this.state;

    if (timeline.id !== id) updateTimelineId(timelineId, id);

    if (master && masterId !== timelineId) {
      updateMasterId(timebarId, editingTimelineId);
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

  render() {
    const { timelines, masterId } = this.props;
    const { color, willAdd, willEdit, editingTimelineId } = this.state;

    let noTrack;
    if (timelines.length === 0) {
      noTrack = <p className="text-center"><br /><h5><b>No track to display</b></h5></p>;
    }

    let editTrack;
    if (willEdit) {
      editTrack = (<EditTrack
        timeline={timelines.find(x => x.timelineId === editingTimelineId)}
        masterId={masterId}
        hideAddTimeline={this.hideAddTimeline}
        editTimeline={this.editTimeline}
      />);
    }

    return (

      <div className={styles.leftTab}>
        <h5 className={styles.timebarName}>{this.props.timebarName}</h5>
        {editTrack}
        <Form
          horizontal
          className={classnames(styles.form, { hidden: !willAdd })}
          onSubmit={this.willAddTimeline}
        >
          <b>Add a track :</b>
          <br /><br />
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Kind</b>
            <select
              ref={(el) => { this.newTimelineKindEl = el; }}
              className={classnames('form-control', styles.formControl)}
            >
              <option value="kind1">kind 1</option>
              <option value="kind2">kind 2</option>
              <option value="kind3">kind 3</option>
            </select>
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Color</b>
            <ColorPicker color={color} onChange={this.colorChosen} />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Parameter</b>
            <select
              ref={(el) => { this.newTimelineIdEl = el; }}
              className={classnames('form-control', styles.formControl)}
            >
              <option value="param1">param 1</option>
              <option value="param2">param 2</option>
              <option value="param3">param 3</option>
            </select>
          </FormGroup>
          <input
            type="submit"
            autoFocus
            value="Add track"
            className={classnames(styles.addTrackButton, 'btn-sm', 'btn-primary', 'col-md-offset-4')}
          />
          <hr />
          <Button
            bsSize="small"
            className={styles.addTimelineButton}
            onClick={this.toggleAddTimeline}
            bsStyle="default"
            style={{ bottom: '5px', top: 'auto', left: '5px', right: 'auto', padding: '2px 8px' }}
          >
            -
          </Button>
        </Form>
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
              name={v.id}
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
