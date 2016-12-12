import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import TimeSetterFields from './TimeSetterFields';
import Message from '../common/Message';
import styles from './TimeSetter.css';

export default class TimeSetter extends Component {

  static propTypes = {
    updateDefaultWidth: PropTypes.func.isRequired,
    updateCursors: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    cursor: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
    timebarMode: PropTypes.string.isRequired,
  }

  state = {
    errorMessages: [],
    defaultWidth: null,
    changed: false,
    defaultWidthChanged: false,
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

  willUpdateCursors = (e) => {
    e.preventDefault();
    const {
      visuWindow,
      slideWindow,
      timebarId,
      updateCursors,
      updateDefaultWidth,
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

    const defaultWidth = this.state.defaultWidth === null ?
      visuWindow.defaultWidth : this.state.defaultWidth;

    if (defaultWidth !== parseInt(visuWindow.defaultWidth, 10)) {
      updateDefaultWidth(timebarId, defaultWidth);
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

  pauseIfPlaying = () => {
    if (this.props.isPlaying) {
      this.props.pause();
    }
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
    } = this.state;

    let orderedCursors = ['lower', 'slideLower', 'current'];
    if (timebarMode === 'Extensible') {
      orderedCursors = orderedCursors.concat('upper', 'slideUpper');
    } else {
      orderedCursors = orderedCursors.concat('slideUpper', 'upper');
    }

    return (
      <form onSubmit={this.willUpdateCursors} >
        { this.props.messages.length ? this.props.messages.map((v, i) =>
          <Message
            key={i}
            type={v.type}
            message={v.message}
            containerId={`timeSetter-${this.props.timebarId}`}
            messageIndex={i}
            onClose={this.props.removeMessage}
          />
        ) : null}
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
            if (this.props.visuWindow[x]) {
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
                disabled={undisplayed || disabled}
                ms={ms}
                onChange={this.onChangeAction}
              />
            );
          })
        }
        <div className={styles.fieldsContainer}>
          <div
            className="text-capitalize"
            style={{ width: '100%' }}
          >
            <b>Default Width</b>
          </div>
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
                    className={classnames(styles.input, styles[`input_${x[0]}`], 'form-control')}
                  />
                  {(x === 'hours' || x === 'minutes') && <span>:</span>}
                  {x === 'seconds' && <span>.</span>}
                </div>)
              )
            }
          </div>
        </div>
        <div className="text-center">
          <input type="submit" value="Save" className={`btn btn-primary ${(defaultWidthChanged || changed) ? '' : 'disabled'}`} />
          {' '}
          <button className={`btn btn-info ${(defaultWidthChanged || changed) ? '' : 'disabled'}`} onClick={this.cancel}>Cancel changes</button>
        </div>
      </form>
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
