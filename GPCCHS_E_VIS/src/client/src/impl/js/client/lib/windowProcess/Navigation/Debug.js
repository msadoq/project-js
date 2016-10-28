import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { remote } from 'electron';

import { switchDebug } from '../../store/actions/windows';
import { getWindowDebug } from '../../store/selectors/windows';

class Debug extends Component {
  static propTypes = {
    debug: PropTypes.object,
    toggleDebug: PropTypes.func,
    dummy: PropTypes.func,
  };
  componentDidMount() {
    const { debug } = this.props;
    if (debug.whyDidYouUpdate === true && window.whyDidYouUpdate.loaded !== true) {
      window.whyDidYouUpdate();
    }
  }

  handleTimebarVisibility = () => {
    const { debug, toggleDebug } = this.props;
    toggleDebug('timebarVisibility', !debug.timebarVisibility);
  }

  render() {
    const { debug, toggleDebug, dummy } = this.props;

    const toggleWhy = () => {
      if (!debug.whyDidYouUpdate) {
        window.whyDidYouUpdate();
      } else {
        remote.getCurrentWindow().reload();
      }
      toggleDebug('whyDidYouUpdate', !debug.whyDidYouUpdate);
    };

    return (
      <div style={{ display: 'inline' }}>
        <Button href="http://127.0.0.1:3000/debug/" target="_blank">HSS INFO</Button>
        {' '}
        <Button onClick={toggleWhy}>
          WDYU {debug.whyDidYouUpdate ? 'ON' : 'OFF'}
        </Button>
        {' '}
        <Button onClick={dummy}>
          DUMMY
        </Button>
        {' '}
        <Button onClick={this.handleTimebarVisibility}>
          TIMEBAR {debug.timebarVisibility ? 'ON' : 'OFF'}
        </Button>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({ debug: getWindowDebug(state, ownProps) }),
  (dispatch, { windowId }) => bindActionCreators({
    toggleDebug: (what, status) => switchDebug(windowId, what, status),
    dummy: () => ({ type: 'dummy' }),
  }, dispatch)
)(Debug);
