import classnames from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
import styles from './Lefttab.css';

export default class EditTrack extends Component {

  static propTypes = {
    timeline: React.PropTypes.object.isRequired,
    masterId: React.PropTypes.string.isRequired,
    hideAddTimeline: React.PropTypes.func.isRequired,
    editTimeline: React.PropTypes.func.isRequired,
  }

  constructor(...args) {
    super(...args);

    const { timeline } = this.props;
    this.state = {
      duration: moment.duration(timeline.offset)
    };
  }

  componentDidMount() {
    const { masterId, timeline } = this.props;
    const { duration } = this.state;
    this.editTimelineIdEl.value = timeline.id;
    this.editTimelineMasterEl.checked = masterId === timeline.id;
    ['years', 'months', 'days', 'years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      this[`${x}El`].value = duration[x]();
    });
    document.addEventListener('click', this.hideAddTimeline);
  }

  hideAddTimeline = () => {
    const { hideAddTimeline } = this.props;
    if (this.editTimelineFormEl && !this.editTimelineFormEl.parentElement.querySelector(':hover')) {
      hideAddTimeline();
      document.removeEventListener('click', this.hideAddTimeline);
    }
  }

  willEditTimeline = (e) => {
    e.preventDefault();
    const { editTimeline, timeline } = this.props;

    const duration = moment.duration();
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
        <input
          type="submit"
          value="Edit track"
          className={classnames(styles.addTrackButton, 'btn-sm', 'btn-primary', 'col-md-offset-4')}
        />
      </form>
    );
  }
}
