import { get } from 'lodash';
import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { constants as globalConstants } from 'common';
import { updateVisuWindow } from '../../store/actions/timebars';

class Timebar extends PureComponent {
  static propTypes = {
    focusedPage: PropTypes.object.isRequired,
    visuWindow: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(...args) {
    super(...args);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.moveNow = this.moveNow.bind(this);
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
  moveBackward() {
    this.updateVisuWindow(-10000);
  }
  moveNow() {
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
      this.tick();
      this.setState({ mode: 'play' });
    } else {
      clearInterval(this.interval);
      this.setState({ mode: 'pause' });
    }
  }
  tick() {
    this.interval = setTimeout(
      () => {
        this.updateVisuWindow(globalConstants.HSC_PLAY_FREQUENCY);
        this.tick();
      },
      globalConstants.HSC_PLAY_FREQUENCY
    );
  }
  render() {
    const { mode } = this.state;

    const buttonsProps = {
      bsSize: 'small',
      bsStyle: 'link',
    };

    return (
      <div style={{ display: 'inline-block' }}>
        <Button onClick={this.moveBackward} {...buttonsProps}>{'<<'} 10s</Button>
        {' '}
        <Button onClick={this.moveNow} {...buttonsProps}>
          NOW
        </Button>
        {' '}
        <Button onClick={this.moveForward} {...buttonsProps}>10s {'>>'}</Button>
        {' '}
        <Button onClick={this.toggleMode} {...buttonsProps}>
          {mode === 'play' ? 'PAUSE' : `PLAY (${globalConstants.HSC_PLAY_FREQUENCY}ms)`}
        </Button>
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
