import { remote, shell } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { switchDebug } from '../../store/actions/windows';
import { getWindowDebug } from '../../store/selectors/windows';
import { getPage } from '../../store/selectors/pages';
import visibleRemoteIdsMap from '../../dataManager/map/visibleRemoteIds';
import visibleViewsMap from '../../dataManager/map/visibleViews';

import Timebar from './Timebar';

class Debug extends PureComponent {
  static propTypes = {
    focusedPage: PropTypes.object,
    debug: PropTypes.object,
    toggleDebug: PropTypes.func,
    dummy: PropTypes.func,
  };
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };
  componentDidMount() {
    const { debug } = this.props;
    if (debug.whyDidYouUpdate === true && window.whyDidYouUpdate.loaded !== true) {
      window.whyDidYouUpdate();
    }
  }

  visibleRemoteIds = () => {
    const state = this.context.store.getState();
    return console.log(visibleRemoteIdsMap(state)); // eslint-disable-line no-console
  };

  visibleViews = () => {
    const state = this.context.store.getState();
    return console.log(visibleViewsMap(state)); // eslint-disable-line no-console
  };

  render() {
    const { debug, toggleDebug, dummy, focusedPage } = this.props;

    const toggleWhy = () => {
      if (!debug.whyDidYouUpdate) {
        window.whyDidYouUpdate();
      } else {
        remote.getCurrentWindow().reload();
      }
      toggleDebug('whyDidYouUpdate', !debug.whyDidYouUpdate);
    };

    const buttonsProps = {
      bsSize: 'small',
      bsStyle: 'link',
    };

    return (
      <div style={{ display: 'inline' }}>
        <Button onClick={() => shell.openExternal('http://127.0.0.1:3000/debug/')} {...buttonsProps}>
          HSS
        </Button>
        {' '}
        <Button onClick={toggleWhy} {...buttonsProps}>
          WDYU {debug.whyDidYouUpdate ? 'ON' : 'OFF'}
        </Button>
        {' '}
        <Button onClick={dummy} {...buttonsProps}>
          DUMMY
        </Button>
        {' '}
        <Button onClick={this.visibleRemoteIds} {...buttonsProps}>DATA MAP</Button>
        {' '}
        <Button onClick={this.visibleViews} {...buttonsProps}>VIEW MAP</Button>
        {' '}
        {focusedPage && focusedPage.timebarId ? <Timebar {...this.props} /> : null}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    debug: getWindowDebug(state, ownProps),
    focusedPage: getPage(state, ownProps.focusedPageId),
  }),
  (dispatch, { windowId }) => bindActionCreators({
    toggleDebug: (what, status) => switchDebug(windowId, what, status),
    dummy: () => ({ type: 'dummy' }),
  }, dispatch)
)(Debug);
