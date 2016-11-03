import React, { Component } from 'react';
import { Button, FormGroup, Form } from 'react-bootstrap';
import Timeline from './Timeline';
import styles from './Lefttab.css';
import ColorPicker from '../Editor/Components/ColorPicker';

export default class Lefttab extends Component {
  static propTypes = {
    timelines: React.PropTypes.array.isRequired,
    timebarId: React.PropTypes.string.isRequired,
    timebarName: React.PropTypes.string.isRequired,
    addAndMountTimeline: React.PropTypes.func.isRequired,
    unmountTimeline: React.PropTypes.func.isRequired
  }

  constructor(...args) {
    super(...args);
    this.state = {
      willAdd: false
    };
  }

  displayAddTimeline = (e) => {
    e.preventDefault();
    this.setState({ willAdd: !this.state.willAdd });
  }

  handleSelectChange = (e) => {
    this.refs.newTimelineName.value = e.target.value;
  }

  willAddTimeline = (e) => {
    e.preventDefault();
    this.props.addAndMountTimeline(
      this.props.timebarId,
      {
        kind: this.refs.newTimelineProprety.value,
        id: this.refs.newTimelineName.value,
        color: `
          ${this.props.timelines.length * 43},
          ${(Math.random() * 40) + 50}%,
          ${(Math.random() * 20) + 10}%`
      });
  }

  render() {
    const { timelines, unmountTimeline } = this.props;

    let formKlass = styles.form;
    if (this.state.willAdd) formKlass += ' hidden';

    let noTrack;
    if (timelines.length === 0) {
      noTrack = <p className="text-center"><br /><h5><b>No track to display</b></h5></p>;
    }

    return (

      <div>
        <h5>{this.props.timebarName}</h5>
        <Form horizontal className={formKlass}>
          <b>Add a track :</b>
          <br /><br />
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>Parameter</b>
            <select ref="newTimelineProprety" className={`form-control ${styles.formControl}`} onChange={this.handleSelectChange}>
              <option value="value1">valeur 1</option>
              <option value="value2">valeur 2</option>
              <option value="value3">valeur 3</option>
            </select>
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <b className={styles.labelFormControl}>name</b>
            <input ref="newTimelineName" className={`form-control ${styles.formControl}`} value={this.state.newTimelineName}/>
          </FormGroup>
          <Button className="btn-sm btn-primary col-md-offset-4" onClick={this.willAddTimeline}>Add track</Button>
          <hr />
        </Form>
        <Button bsSize="small" className={styles.addTimelineButton} onClick={this.displayAddTimeline} bsStyle="info">+</Button>
        {noTrack}
        <ul className={styles.timelineUl}>
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
