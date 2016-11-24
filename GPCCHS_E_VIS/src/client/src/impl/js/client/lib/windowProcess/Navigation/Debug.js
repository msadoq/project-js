import { remote } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { switchDebug } from '../../store/actions/windows';
import { getWindowDebug } from '../../store/selectors/windows';
import { getPage } from '../../store/selectors/pages';
import dataMapGenerator from '../../dataManager/map/dataMapGenerator';
import viewMapGenerator from '../../dataManager/map/viewMapGenerator';
import { updateCacheInvalidation } from '../../store/actions/hsc';

class Debug extends PureComponent {
  static propTypes = {
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

  hssState = () => {
    fetch('http://127.0.0.1:3000/debug/all')
      .then(r => r.json())
      .then(json => console.log(json)); // eslint-disable-line no-console
  };

  visibleRemoteIds = () => {
    const state = this.context.store.getState();
    return console.log(dataMapGenerator(state)); // eslint-disable-line no-console
  };

  visibleViews = () => {
    const state = this.context.store.getState();
    return console.log(viewMapGenerator(state)); // eslint-disable-line no-console
  };

  cleanCache = () => {
    this.context.store.dispatch(updateCacheInvalidation(Date.now() - 1e10));
    this.props.dummy();
  };

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

    const buttonsProps = {
      bsSize: 'small',
      bsStyle: 'link',
    };

    return (
      <div style={{ display: 'inline' }}>
        <Button onClick={this.hssState} {...buttonsProps}>HSS</Button>
        {' '}
        <Button onClick={toggleWhy} {...buttonsProps}>
          WDYU {debug.whyDidYouUpdate ? 'ON' : 'OFF'}
        </Button>
        {' '}
        <Button onClick={dummy} {...buttonsProps}>DUMMY</Button>
        {' '}
        <Button onClick={this.visibleRemoteIds} {...buttonsProps}>DATA MAP</Button>
        {' '}
        <Button onClick={this.visibleViews} {...buttonsProps}>VIEW MAP</Button>
        {' '}
        <Button onClick={this.cleanCache} {...buttonsProps}>CLEAN CACHE</Button>
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
