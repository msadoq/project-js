import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import classnames from 'classnames';
import TimeSetterFields from './TimeSetterFields';
import Message from '../common/Message';
import styles from './TimeSetter.css';

export default class TimeSetter extends Component {

  static propTypes = {
    updateDefaultWidth: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    updateViewport: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    cursor: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
    timebarRulerResolution: PropTypes.string.isRequired,
  }

  state = {
    errorMessages: [],
    defaultWidth: null,
    changed: false,
    defaultWidthChanged: false,
    dayToJump: null,
  }

  componentDidMount() {
    this.pauseIfPlaying();
  }

  componentWillReceiveProps(nextProps) {
    // If no error message, clean states
    if (!nextProps.messages.length) {
      this.cancel();
    }
  }

  componentDidUpdate() {
    this.pauseIfPlaying();
  }

  onChangeAction = (value, cursor) => {
    this.setState({
      [cursor]: value,
      changed: true,
    });
  }

  onDefaultWidthChange = () => {
    const defaultWidth = moment.duration(0);
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach((v) => {
      defaultWidth.add(parseInt(this[`defaultWidth${v}El`].value, 10), v);
    });
    this.setState({
      defaultWidth: defaultWidth.asMilliseconds(),
      defaultWidthChanged: true,
    });
  }


  setDayToJump = (arr, date) => {
    this.setState({
      dayToJump: date,
    });
  }

  jumpToDay = (e) => {
    e.preventDefault();
    const {
      timebarId,
      visuWindow,
      jump,
      updateViewport,
      timebarRulerResolution,
    } = this.props;
    const {
      dayToJump,
    } = this.state;
    const midDayMs = moment(dayToJump)
      .hours(12)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toDate()
      .getTime();
    const diffMs = midDayMs - visuWindow.current;
    jump(
      timebarId,
      diffMs
    );
    updateViewport(
      timebarId,
      midDayMs - (visuWindow.upper - visuWindow.lower),
      timebarRulerResolution
    );
    this.setState({ dayToJump: null });
  }

  pauseIfPlaying = () => {
    if (this.props.isPlaying) {
      this.props.pause();
    }
  }

  cancel = (e) => {
    if (e) e.preventDefault();
    this.setState({
      lower: null,
      upper: null,
      current: null,
      slideLower: null,
      slideUpper: null,
      changed: false,
      defaultWidthChanged: false,
    });
  }

  willSetDefaultWidth = (e) => {
    e.preventDefault();
    const {
      timebarId,
      updateDefaultWidth,
      visuWindow,
    } = this.props;

    const defaultWidth = this.state.defaultWidth === null ?
    visuWindow.defaultWidth : this.state.defaultWidth;

    if (defaultWidth !== parseInt(visuWindow.defaultWidth, 10)) {
      updateDefaultWidth(timebarId, defaultWidth);
    }
  }

  willUpdateCursors = (e) => {
    e.preventDefault();
    const {
      visuWindow,
      slideWindow,
      timebarId,
      updateCursors,
    } = this.props;

    const newVisuWindow = {
      lower: this.state.lower || visuWindow.lower,
      upper: this.state.upper || visuWindow.upper,
      current: this.state.current || visuWindow.current,
    };
    const newSlideWindow = {
      lower: this.state.slideLower || slideWindow.lower,
      upper: this.state.slideUpper || slideWindow.upper,
    };
    updateCursors(
      timebarId,
      newVisuWindow,
      newSlideWindow
    );
  }

  render() {
    const {
      timebarMode,
      visuWindow,
      slideWindow,
      cursor,
    } = this.props;

    const {
      defaultWidthChanged,
      changed,
      dayToJump,
    } = this.state;

    let orderedCursors = ['lower', 'slideLower', 'current'];
    if (timebarMode === 'Extensible') {
      orderedCursors = orderedCursors.concat('upper', 'slideUpper');
    } else {
      orderedCursors = orderedCursors.concat('slideUpper', 'upper');
    }

    return (
      <div>
        <div>
          <h4>Jump to specific day</h4>
          <div className={styles.fieldsContainer}>
            <Flatpickr
              options={{
                minDate: '1990-01-01',
                maxDate: moment().add(1, 'year').format('YYYY-MM-DD'),
                value: moment(visuWindow.current).format('YYYY-MM-DD'),
                format: 'Y-m-d',
              }}
              defaultValue={moment(visuWindow.current).format('YYYY-MM-DD')}
              onChange={this.setDayToJump}
              className={styles.formControl}
            />
            {' '}
            <Button
              bsSize="small"
              bsStyle="primary"
              disabled={!dayToJump}
              onClick={this.jumpToDay}
            >
              Jump
            </Button>
          </div>
        </div>
        <br />
        <h4>Visu window default width</h4>
        <div className={styles.fieldsContainer}>
          <div className={styles.inputDiv}>
            {
              dateToArray(moment.duration(visuWindow.defaultWidth)).map((x, i) =>
                (<div className={styles.inputDiv} key={i}>
                  <input
                    key={i}
                    defaultValue={x[1]}
                    placeholder={x[0]}
                    ref={(el) => { this[`defaultWidth${x[0]}El`] = el; }}
                    onBlur={this.onDefaultWidthChange}
                    className={classnames(
                      styles.input,
                      styles[`input_${x[0]}`],
                      'form-control'
                    )}
                  />
                  {(x === 'hours' || x === 'minutes') && <span>:</span>}
                  {x === 'seconds' && <span>.</span>}
                </div>)
              )
            }
          </div>
          <Button
            bsSize="small"
            bsStyle="primary"
            disabled={!defaultWidthChanged}
            onClick={this.willSetDefaultWidth}
          >
            Set default width
          </Button>
        </div>
        <form onSubmit={this.willUpdateCursors} >
          <br />
          <h4>Cursor timestamps</h4>
          {
            this.props.messages.length ?
              this.props.messages.map((v, i) =>
                <Message
                  key={i}
                  type={v.type}
                  message={v.message}
                  containerId={`timeSetter-${this.props.timebarId}`}
                  messageIndex={i}
                  onClose={this.props.removeMessage}
                />
              ) : null
            }
          {
            orderedCursors.map((x, i) => {
              let undisplayed = false;
              if (timebarMode !== 'Fixed' && x === 'slideLower') {
                undisplayed = true;
              }
              if (timebarMode === 'Normal' && x === 'slideUpper') {
                undisplayed = true;
              }
              let ms;
              if (visuWindow[x]) {
                ms = this.state[x] || visuWindow[x];
              } else if (x === 'slideLower') {
                ms = this.state.slideLower || slideWindow.lower;
              } else if (x === 'slideUpper') {
                ms = this.state.slideUpper || slideWindow.upper;
              }

              let disabled = cursor !== 'all';
              if (x === cursor) {
                disabled = false;
              }
              return (
                <TimeSetterFields
                  key={i}
                  cursor={x}
                  undisplayed={undisplayed}
                  disabled={disabled}
                  ms={ms}
                  onChange={this.onChangeAction}
                />
              );
            })
          }
          <div className="text-center">
            <input
              type="submit"
              value="Save"
              className={classnames(
                'btn',
                'btn-primary',
                {
                  disabled: !changed,
                }
              )}
            />
            {' '}
            <button
              className={classnames(
                'btn',
                'btn-info',
                { disabled: changed }
              )}
              onClick={this.cancel}
            >
              Cancel changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function dateToArray(m) {
  return [
    ['hours', m.hours()],
    ['minutes', m.minutes()],
    ['seconds', m.seconds()],
    ['milliseconds', m.milliseconds()]
  ];
}
