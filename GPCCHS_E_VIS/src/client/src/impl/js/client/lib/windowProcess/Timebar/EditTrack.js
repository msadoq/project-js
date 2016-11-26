import classnames from 'classnames';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import { FormGroup } from 'react-bootstrap';
import styles from './Lefttab.css';

export default class EditTrack extends Component {

  static propTypes = {
    hideEditTimeline: PropTypes.func.isRequired,
    editTimeline: PropTypes.func.isRequired,
    timeline: PropTypes.object.isRequired,
    masterId: PropTypes.string,
  }

  constructor(...args) {
    super(...args);

    const { timeline } = this.props;
    this.state = {
      duration: moment.duration(timeline.offset)
    };
  }

  componentDidMount() {
    this.updateFields();
    document.addEventListener('keyup', this.hideAddTimeline);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ duration: moment.duration(nextProps.timeline.offset) });
  }

  componentDidUpdate() {
    this.updateFields();
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.hideAddTimeline);
  }

  updateFields = () => {
    this.editTimelineIdEl.value = this.props.timeline.id;
    this.editTimelineMasterEl.checked = this.props.masterId === this.props.timeline.id;
    ['years', 'months', 'days', 'years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      this[`${x}El`].value = this.state.duration[x]();
    });
  }

  hideAddTimeline = (e) => {
    e.preventDefault();
    // Hit escape
    if (e && e.keyCode && e.keyCode === 27) {
      this.props.hideEditTimeline();
    }
  }

  willEditTimeline = (e) => {
    e.preventDefault();
    const { editTimeline, timeline } = this.props;

    const duration = moment.duration();
    // Dynamically fullfilling inputs
    ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      const val = parseInt(this[`${x}El`].value, 10) || 0;
      duration.add(val, x);
    });

    editTimeline(
      timeline.timelineId,
      this.editTimelineIdEl.value,
      duration.asMilliseconds(),
      this.editTimelineMasterEl.checked
    );
  }

  render() {
    const { timeline, masterId } = this.props;

    return (
      <form
        className={classnames('form-horizontal', styles.form, styles.editForm)}
        onSubmit={this.willEditTimeline}
        ref={(el) => { this.editTimelineFormEl = el; }}
      >
        <b>Edit a track :</b>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Id</b>
          <input
            ref={(el) => { this.editTimelineIdEl = el; }}
            className={classnames('form-control', styles.formControl)}
            disabled={masterId === timeline.id}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Master track</b>
          <input
            ref={(el) => { this.editTimelineMasterEl = el; }}
            type="checkbox"
            disabled={masterId === timeline.id}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Offset Y M D</b>
          {
            ['years', 'months', 'days'].map((x, i) =>
              <input
                key={i}
                type="number"
                ref={(el) => { this[`${x}El`] = el; }}
                placeholder={x}
                className={classnames(styles.input, styles[`input_${x}`], 'form-control')}
              />
            )
          }
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>Offset H M S MS</b>
          {
            ['hours', 'minutes', 'seconds', 'milliseconds'].map((x, i) =>
              <input
                key={i}
                type="number"
                ref={(el) => { this[`${x}El`] = el; }}
                placeholder={x}
                className={classnames(styles.input, styles[`input_${x}`], 'form-control')}
              />
            )
          }
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <b className={styles.labelFormControl}>&nbsp;</b>
          <input
            type="submit"
            value="Edit track"
            className={classnames(styles.addTrackButton, 'btn-md', 'btn-primary')}
          />
        </FormGroup>
      </form>
    );
  }
}
