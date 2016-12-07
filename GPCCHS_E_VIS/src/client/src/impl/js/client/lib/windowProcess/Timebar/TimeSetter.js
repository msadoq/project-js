import React, { Component, PropTypes } from 'react';
import TimeSetterFields from './TimeSetterFields';
import Message from '../common/Message';

export default class TimeSetter extends Component {

  static propTypes = {
    updateCursors: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    visuWindow: PropTypes.object.isRequired,
    slideWindow: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    cursor: PropTypes.string.isRequired,
    timebarId: PropTypes.string.isRequired,
  }

  state = {
    errorMessages: []
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
    this.setState({ [cursor]: value });
  }

  pauseIfPlaying = () => {
    if (this.props.isPlaying) {
      this.props.pause();
    }
  }

  willUpdateCursors = (e) => {
    e.preventDefault();
    const visuWindow = {
      lower: this.state.lower || this.props.visuWindow.lower,
      upper: this.state.upper || this.props.visuWindow.upper,
      current: this.state.current || this.props.visuWindow.current,
    };
    const slideWindow = {
      lower: this.state.slideLower || this.props.slideWindow.lower,
      upper: this.state.slideUpper || this.props.slideWindow.upper,
    };
    this.props.updateCursors(this.props.timebarId, visuWindow, slideWindow);
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

  render() {
    return (
      <form onSubmit={this.willUpdateCursors} >
        { this.props.messages.length ?
          (this.props.messages.map((v, i) =>
            <Message
              key={i}
              type={v.type}
              message={v.message}
              containerId={`timeSetter-${this.props.timebarId}`}
              messageIndex={i}
              onClose={this.props.removeMessage}
            />
          )) : null
        }
        {
          ['slideLower', 'lower', 'current', 'upper', 'slideUpper'].map((x, i) => {
            let ms;
            if (this.props.visuWindow[x]) {
              ms = this.state[x] || this.props.visuWindow[x];
            } else if (x === 'slideLower') {
              ms = this.state[x] || this.props.slideWindow.lower;
            } else if (x === 'slideUpper') {
              ms = this.state[x] || this.props.slideWindow.upper;
            }

            let disabled = this.props.cursor !== 'all';
            if (x === this.props.cursor) {
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
        <div className="text-center">
          <input type="submit" value="Save" className="btn btn-primary" />
          {' '}
          <button className="btn btn-info" onClick={this.cancel}>Cancel changes</button>
        </div>
      </form>
    );
  }
}
