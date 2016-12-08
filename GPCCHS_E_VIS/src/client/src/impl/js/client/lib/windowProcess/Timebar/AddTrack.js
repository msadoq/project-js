import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import styles from './Lefttab.css';
import ColorPicker from '../Editor/Components/ColorPicker';

export default class AddTrack extends Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    timelines: PropTypes.array.isRequired,
    sessions: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
  }

  state = {
    errorMessage: null,
    color: this.props.color,
  }

  willAddTimeline = (e) => {
    e.preventDefault();
    if (!this.newTimelineIdEl.value) {
      this.setState({ errorMessage: 'Please enter an id for the new track' });
    } else if (this.props.timelines.find(t => t.id === this.newTimelineIdEl.value)) {
      this.setState({ errorMessage: 'This id is already taken' });
    } else {
      this.props.onChange(
        this.newTimelineKindEl.value,
        this.newTimelineIdEl.value,
        this.state.color,
        parseInt(this.newTimelineSessionEl.value, 10)
      );
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

  colorChosen = (c) => {
    this.setState({ color: c });
  }

  render() {
    const { color, sessions } = this.props;
    const { errorMessage } = this.state;

    return (
      <Form
        horizontal
        onSubmit={this.willAddTimeline}
      >
        {
          errorMessage ?
            <p className="text-danger" style={{ fontSize: '1em' }}>{errorMessage}</p>
            : null
        }
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Kind</b>
          <select
            ref={(el) => { this.newTimelineKindEl = el; }}
            className={classnames('form-control', styles.formControl)}
          >
            <option value="session">session</option>
            <option disabled value="dataSet">dataSet</option>
            <option disabled value="recordSet">recordSet</option>
          </select>
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Color</b>
          <ColorPicker color={color} onChange={this.colorChosen} />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Id</b>
          <input
            ref={(el) => { this.newTimelineIdEl = el; }}
            className={classnames('form-control', styles.formControl)}
            placeholder="Parameter n"
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Session</b>
          <select
            ref={(el) => { this.newTimelineSessionEl = el; }}
            className={classnames('form-control', styles.formControl)}
          >
            { sessions.map((v, i) => <option key={i} value={v.id}>{v.name}</option>) }
          </select>
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>&nbsp;</b>
          <input
            type="submit"
            autoFocus
            value="Add track"
            className={classnames(styles.addTrackButton, 'btn-md', 'btn-primary')}
          />
        </FormGroup>
      </Form>
    );
  }
}
