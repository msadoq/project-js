import React, { Component } from 'react';
import { Button, FormGroup, Form } from 'react-bootstrap';
import Timeline from './Timeline';
import styles from './Lefttab.css';

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

  state = {
    willAdd: false
  }

  componentDidUpdate() {
    this.timelinesEl.scrollTop = this.props.verticalScroll;
  }

  toggleAddTimeline = (e) => {
    if (e) e.preventDefault();
    this.setState({ willAdd: !this.state.willAdd });
  }

  handleSelectChange = (e) => {
    this.newTimelineNameEl.value = e.target.value;
  }

  willAddTimeline = (e) => {
    e.preventDefault();
    this.props.addAndMountTimeline(
      this.props.timebarId,
      {
        kind: this.newTimelinePropretyEl.value,
        id: this.newTimelineNameEl.value,
        color: `
          ${this.props.timelines.length * 43},
          ${(Math.random() * 80) + 20}%,
          ${(Math.random() * 40) + 20}%`
      });
    this.toggleAddTimeline();
  }

  render() {
    const { timelines, unmountTimeline } = this.props;

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
            <b className={styles.labelFormControl}>name</b>
            <input
              ref={(el) => { this.newTimelineNameEl = el; }}
              className={`form-control ${styles.formControl}`}
              value={this.state.newTimelineName}
            />
          </FormGroup>
          <input type="submit" value="Add track" className={`${styles.addTrackButton} btn-sm btn-primary col-md-offset-4`} onClick={this.willAddTimeline} />
          <hr />
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
              unmountTimeline={unmountTimeline}
            />
          )}
        </ul>
      </div>
    );
  }
}
