import { get } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateVisuWindow } from '../../store/actions/timebars';

function timestampAsText(timestamp) {
  const d = new Date(timestamp);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}

class Timebar extends Component {
  static propTypes = {
    focusedPage: React.PropTypes.object.isRequired,
    visuWindow: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.moveForward = this.moveForward.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.state = {
      mode: 'pause',
    };
  }
  updateVisuWindow(ms) {
    const { focusedPage, visuWindow } = this.props;
    const { timebarId } = focusedPage;
    this.props.dispatch(updateVisuWindow(
      timebarId,
      visuWindow.lower + ms,
      visuWindow.upper + ms,
      visuWindow.current + ms
    ));
  }
  moveForward() {
    this.updateVisuWindow(10000);
  }
  toggleMode() {
    if (this.state.mode === 'pause') {
      this.interval = setInterval(() => this.updateVisuWindow(250), 250);
      this.setState({ mode: 'play' });
    } else {
      clearInterval(this.interval);
      this.setState({ mode: 'pause' });
    }
  }
  render() {
    const { mode } = this.state;
    const { visuWindow } = this.props;
    const lower = timestampAsText(visuWindow.lower);
    const current = timestampAsText(visuWindow.current);
    const upper = timestampAsText(visuWindow.upper);

    return (
      <div style={{ display: 'inline' }}>
        <div style={{ display: 'inline-block' }}>
          <Button onClick={this.moveForward}>MOVE 10s</Button>
          {' '}
          <Button onClick={this.toggleMode}>{mode === 'play' ? 'PAUSE' : 'PLAY'}</Button>
        </div>
        <div>
          [{lower}|{current}|{upper}]
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const { timebarId } = ownProps.focusedPage;
  return {
    visuWindow: get(state, ['timebars', timebarId, 'visuWindow']),
  };
})(Timebar);
