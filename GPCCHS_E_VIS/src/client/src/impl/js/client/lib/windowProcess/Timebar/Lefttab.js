import { difference } from 'lodash';
import React, { Component } from 'react';
import { Button, FormGroup, Form } from 'react-bootstrap';
import { schemeCategory20b } from 'd3-scale';
import Timeline from './Timeline';
import styles from './Lefttab.css';
import ColorPicker from '../Editor/Components/ColorPicker';

export default class Lefttab extends Component {
  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timebarName: React.PropTypes.string.isRequired,
    addAndMountTimeline: React.PropTypes.func.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired,
    onVerticalScroll: React.PropTypes.func.isRequired,
    verticalScroll: React.PropTypes.number.isRequired,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      willAdd: false,
      color: schemeCategory20b[this.props.timelines.length % 20]
    };
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
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

  handleSelectChange = (e) => {
    this.newTimelineNameEl.value = e.target.value;
  }

  toggleAddTimeline = (e) => {
    if (e) e.preventDefault();
    this.setState({ willAdd: !this.state.willAdd });
  }

  willAddTimeline = (e) => {
    e.preventDefault();
    const { color } = this.state;
    this.props.addAndMountTimeline(
      this.props.timebarId,
      {
        kind: this.newTimelinePropretyEl.value,
        id: this.newTimelineNameEl.value,
        color
      });
    this.setColor(color);
    this.toggleAddTimeline();
  }

  render() {
    const { timelines } = this.props;
    const { newTimelineName, color } = this.state;

    let formKlass = styles.form;
    if (!this.state.willAdd) formKlass += ' hidden';

    let noTrack;
    if (timelines.length === 0) {
      noTrack = <p className="text-center"><br /><h5><b>No track to display</b></h5></p>;
    }

    return (

      <div>
        <h5 className={styles.timebarName}>{this.props.timebarName}</h5>
        <Form horizontal className={formKlass}>
          <b>Add a track :</b>
          <br /><br />
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Parameter</b>
            <select
              ref={(el) => { this.newTimelinePropretyEl = el; }}
              className={`form-control ${styles.formControl}`}
              onChange={this.handleSelectChange}
            >
              <option value="value1">valeur 1</option>
              <option value="value2">valeur 2</option>
              <option value="value3">valeur 3</option>
            </select>
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Color</b>
            <ColorPicker color={color} onChange={this.colorChosen} />
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Name</b>
            <input
              ref={(el) => { this.newTimelineNameEl = el; }}
              className={`form-control ${styles.formControl}`}
              value={newTimelineName}
            />
          </FormGroup>
          <input type="submit" value="Add track" className={`${styles.addTrackButton} btn-sm btn-primary col-md-offset-4`} onClick={this.willAddTimeline} />
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
        <Button bsSize="small" className={styles.addTimelineButton} title="Add track" onClick={this.toggleAddTimeline} bsStyle="info">+</Button>
        {noTrack}
        <ul
          ref={(el) => { this.timelinesEl = el; }}
          className={styles.timelineUl}
          onScroll={this.props.onVerticalScroll}
        >
          { timelines.map((v, i) =>
            <Timeline
              key={i}
              name={v.id}
              timebarId={this.props.timebarId}
              id={v.timelineId}
              color={v.color}
              unmountTimeline={this.unmountTimelineAction}
            />
          )}
        </ul>
      </div>
    );
  }
}
