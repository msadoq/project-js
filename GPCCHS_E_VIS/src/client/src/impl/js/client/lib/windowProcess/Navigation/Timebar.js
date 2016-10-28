import { get } from 'lodash';
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { constants as globalConstants } from 'common';
import { updateVisuWindow } from '../../store/actions/timebars';

function timestampAsText(timestamp) {
  const d = new Date(timestamp);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}

class Timebar extends PureComponent {
  static propTypes = {
    focusedPage: PropTypes.object.isRequired,
    visuWindow: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.moveForward = this.moveForward.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.goNow = this.goNow.bind(this);
    this.state = {
      mode: 'pause',
    };
  }
  updateVisuWindow(ms) {
    const { focusedPage, visuWindow } = this.props;
    const { timebarId } = focusedPage;
    this.props.dispatch(updateVisuWindow(
      timebarId,
      {
        lower: visuWindow.lower + ms,
        upper: visuWindow.upper + ms,
        current: visuWindow.current + ms,
      }
    ));
  }
  moveForward() {
    this.updateVisuWindow(10000);
  }
  goNow() {
    const { focusedPage } = this.props;
    const { timebarId } = focusedPage;
    this.props.dispatch(updateVisuWindow(
      timebarId,
      {
        lower: Date.now() - 1e5,
        current: Date.now(),
        upper: Date.now() + 1e5,
      }
    ));
  }
  toggleMode() {
    if (this.state.mode === 'pause') {
      this.interval = setInterval(
        () => this.updateVisuWindow(globalConstants.HSC_PLAY_FREQUENCY),
        globalConstants.HSC_PLAY_FREQUENCY
      );
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

    const buttonsProps = {
      bsSize: 'small',
      bsStyle: 'link',
    };

    return (
      <div style={{ display: 'inline-block' }}>
        <Button onClick={this.moveForward} {...buttonsProps}>MOVE 10s</Button>
        {' '}
        <Button onClick={this.toggleMode} {...buttonsProps}>
          {mode === 'play' ? 'PAUSE' : `PLAY (${globalConstants.HSC_PLAY_FREQUENCY}ms)`}
        </Button>
        {' '}
        <Button onClick={this.goNow} {...buttonsProps}>
          go now
        </Button>
        [{lower}|{current}|{upper}]
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
