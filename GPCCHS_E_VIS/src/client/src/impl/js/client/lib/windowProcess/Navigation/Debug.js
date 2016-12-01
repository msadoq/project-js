import { remote, clipboard } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  MenuItem,
  ButtonToolbar,
  DropdownButton,
  Glyphicon
} from 'react-bootstrap';

import { switchDebug } from '../../store/actions/windows';
import { getWindowDebug } from '../../store/selectors/windows';
import { getPage } from '../../store/selectors/pages';
import dataMapGenerator from '../../dataManager/map';
import { updateCacheInvalidation } from '../../store/actions/hsc';

const style = {
  position: 'fixed',
  top: '5px',
  right: '5px',
  zIndex: 1
};

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

  dataMap = () => {
    const state = this.context.store.getState();
    return console.log(dataMapGenerator(state)); // eslint-disable-line no-console
  };

  cleanCache = () => {
    this.context.store.dispatch(updateCacheInvalidation(Date.now() - 1e10));
    this.props.dummy();
  };

  copyStateToClipboard = () => {
    clipboard.writeText(JSON.stringify(this.context.store.getState()));
    return console.log('store state exported to clipboard'); // eslint-disable-line no-console
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
      <ButtonToolbar style={style}>
        <DropdownButton
          bsSize="xsmall"
          title={<Glyphicon
            glyph="cog"
          />}
          id="dropdown-size-large"
          pullRight
        >
          <MenuItem
            eventKey="1"
            onClick={this.hssState}
            {...buttonsProps}
          >
            Action
          </MenuItem>
          <MenuItem
            eventKey="2"
            onClick={toggleWhy}
            {...buttonsProps}
          >
            WDYU {debug.whyDidYouUpdate ? 'ON' : 'OFF'}
          </MenuItem>
          <MenuItem
            eventKey="3"
            onClick={dummy}
            {...buttonsProps}
          >
            DUMMY
          </MenuItem>
          <MenuItem
            eventKey="4"
            onClick={this.dataMap}
            {...buttonsProps}
          >
            DATA MAP
          </MenuItem>
          <MenuItem
            eventKey="6"
            onClick={this.copyStateToClipboard}
            {...buttonsProps}
          >
            COPY STATE
          </MenuItem>
          <MenuItem
            eventKey="7"
            onClick={this.cleanCache}
            {...buttonsProps}
          >
            CLEAN CACHE
          </MenuItem>
        </DropdownButton>
      </ButtonToolbar>
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
