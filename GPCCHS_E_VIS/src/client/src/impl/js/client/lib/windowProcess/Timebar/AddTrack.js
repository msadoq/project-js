import classnames from 'classnames';
import React, { Component } from 'react';
import { FormGroup, Form, Button } from 'react-bootstrap';
import styles from './Lefttab.css';
import ColorPicker from '../Editor/Components/ColorPicker';

export default class AddTrack extends Component {

  static propTypes = {
    color: React.PropTypes.string.isRequired,
    timelines: React.PropTypes.array.isRequired,
    sessions: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    toggleAddTimeline: React.PropTypes.func.isRequired,
  }

  state = {
    errorMessage: null,
    color: this.props.color,
  }

  componentDidMount() {
    document.addEventListener('keyup', this.willUnmount);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.willUnmount);
  }

  willUnmount = (e) => {
    const { toggleAddTimeline } = this.props;
    if (e.keyCode === 27) toggleAddTimeline();
  }

  willAddTimeline = (e) => {
    e.preventDefault();
    const { timelines, onChange } = this.props;
    if (!this.newTimelineIdEl.value) {
      this.setState({ errorMessage: 'Please enter an id for the new track' });
    } else if (timelines.find(t => t.id === this.newTimelineIdEl.value)) {
      this.setState({ errorMessage: 'This id is already taken' });
    } else {
      onChange(
        this.newTimelineKindEl.value,
        this.newTimelineIdEl.value,
        this.state.color,
        parseInt(this.newTimelineSessionEl.value, 10)
      );
    }
  }

  colorChosen = (c) => {
    this.setState({ color: c });
  }

  render() {
    const { color, sessions, toggleAddTimeline } = this.props;
    const { errorMessage } = this.state;

    return (
      <Form
        horizontal
        className={classnames(styles.form)}
        onSubmit={this.willAddTimeline}
      >
        <b>Add a track :</b>
        <br /><br />
        {errorMessage ? <p className="text-danger" style={{ fontSize: '1em' }}>{errorMessage}</p> : null}
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
          onClick={toggleAddTimeline}
          bsStyle="default"
          style={{ bottom: '5px', top: 'auto', left: '5px', right: 'auto', padding: '2px 8px' }}
        >
          -
        </Button>
      </Form>
    );
  }
}
