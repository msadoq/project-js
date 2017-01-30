import { clipboard } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import {
  MenuItem,
  DropdownButton,
  Glyphicon,
} from 'react-bootstrap';
import dataMapGenerator from '../../dataManager/map';
import { updateCacheInvalidation } from '../../store/actions/hsc';
import { main } from '../ipc';

const buttonsProps = {
  bsSize: 'small',
  bsStyle: 'link',
};

export default class Debug extends PureComponent {
  static propTypes = {
    dummy: PropTypes.func,
    toggleHelp: PropTypes.func,
  };
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  serverDebug = () => {
    main.serverDebug(debug => console.log(debug)); // eslint-disable-line no-console
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

  toggleHelp = (e) => {
    e.preventDefault();
    this.props.toggleHelp();
  }

  toggleWhy = () => {
    if (window.whyDidYouUpdate.loaded !== true) {
      window.whyDidYouUpdate();
    }
  }

  render() {
    const { dummy } = this.props;

    return (
      <DropdownButton
        bsSize="sm"
        bsStyle="default"
        title={<Glyphicon glyph="cog" />}
        id="dropdown-size-large"
      >
        <MenuItem
          eventKey="1"
          onClick={this.serverDebug}
          {...buttonsProps}
        >
          SERVER INFO
        </MenuItem>
        <MenuItem
          eventKey="2"
          onClick={this.toggleWhy}
          {...buttonsProps}
        >
          WDYU {window.whyDidYouUpdate.loaded ? 'ON' : 'OFF'}
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
    );
  }
}
