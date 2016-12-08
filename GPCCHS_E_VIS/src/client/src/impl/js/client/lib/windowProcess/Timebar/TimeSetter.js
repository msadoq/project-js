import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _difference from 'lodash/difference';
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
    errorMessages: []
  }

  componentDidMount() {
    this.pauseIfPlaying();
    this.updateFields();
  }

  componentWillReceiveProps(nextProps) {
    // If no error message, clean states
    if (!nextProps.messages.length) {
      this.cancel();
    }
  }

  componentDidUpdate() {
    this.pauseIfPlaying();
    this.updateFields();
  }

  onChangeAction = (value, cursor) => {
    this.setState({ [cursor]: value });
  }

  pauseIfPlaying = () => {
    if (this.props.isPlaying) {
      this.props.pause();
    }
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

    const duration = moment.duration();
    // Dynamically fullfilling inputs
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      const val = parseInt(this[`defaultWidth${x}El`].value, 10) || 0;
      duration.add(val, x);
    });
    const ms = duration.asMilliseconds();
    if (ms !== parseInt(visuWindow.defaultWidth, 10)) {
      updateDefaultWidth(timebarId, ms);
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
    });
  }

  updateFields = () => {
    const { visuWindow } = this.props;
    /*
    If refs are absent, it means we are jest-testing the component
    refs are not compatible with jest testing for now
    */
    if (!this.defaultWidthhoursEl) {
      return;
    }

    const duration = moment.duration(visuWindow.defaultWidth);
    ['hours', 'minutes', 'seconds', 'milliseconds'].forEach((x) => {
      this[`defaultWidth${x}El`].value = duration[x]();
    });
  }

  render() {
    const {
      timebarMode,
      visuWindow,
      slideWindow,
      cursor,
    } = this.props;

    let orderedCursors = ['lower', 'slideLower', 'current'];
    if (timebarMode === 'Extensible') {
      orderedCursors = orderedCursors.concat('upper', 'slideUpper');
    } else {
      orderedCursors = orderedCursors.concat('slideUpper', 'upper');
    }

    if (timebarMode !== 'Fixed') {
      orderedCursors = _difference(orderedCursors, ['slideLower']);
    }
    if (timebarMode === 'Normal') {
      orderedCursors = _difference(orderedCursors, ['slideUpper']);
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
            let ms;
            if (this.props.visuWindow[x]) {
              ms = this.state[x] || visuWindow[x];
            } else if (x === 'slideLower') {
              ms = this.state[x] || slideWindow.lower;
            } else if (x === 'slideUpper') {
              ms = this.state[x] || slideWindow.upper;
            }

            let disabled = cursor !== 'all';
            if (x === cursor) {
              disabled = false;
            }
            return (
              <TimeSetterFields
                key={i}
                cursor={x}
                disabled={disabled}
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
              ['hours', 'minutes', 'seconds', 'milliseconds'].map((x, i) =>
                (
                  <div className={styles.inputDiv} key={i}>
                    <input
                      key={i}
                      type="number"
                      ref={(el) => { this[`defaultWidth${x}El`] = el; }}
                      placeholder={x}
                      className={classnames(styles.input, styles[`input_${x}`], 'form-control')}
                    />
                    {(x === 'hours' || x === 'minutes') && <span>:</span>}
                    {x === 'seconds' && <span>.</span>}
                  </div>
                )
              )
            }
          </div>
        </div>
        <div className="text-center">
          <input type="submit" value="Save" className="btn btn-primary" />
          {' '}
          <button className="btn btn-info" onClick={this.cancel}>Cancel changes</button>
        </div>
      </form>
    );
  }
}
