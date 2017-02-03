import { clipboard } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import {
  MenuItem,
  DropdownButton,
  Glyphicon,
} from 'react-bootstrap';
import Perf from 'react-dom/lib/ReactPerf';
import { HSC_ORCHESTRATION_FREQUENCY } from 'common/constants';
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
    focusedPage: PropTypes.shape({
      timebarUuid: PropTypes.string,
    }),
    play: PropTypes.func,
    pause: PropTypes.func,
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
    if (_get(window, ['whyDidYouUpdate', 'loaded'], false) !== true) {
      window.whyDidYouUpdate();
    }
  }

  printReactWastedRenders = () => {
    this.props.play(this.props.focusedPage.timebarUuid);
    Perf.start();
    setTimeout(() => {
      Perf.stop();
      console.log('WASTED');
      Perf.printWasted();
      console.log('INCLUSIVE');
      Perf.printInclusive();
      console.log('EXCLUSIVE');
      Perf.printExclusive();
      this.props.pause(this.props.focusedPage.timebarUuid);
    }, HSC_ORCHESTRATION_FREQUENCY);
  }

  profileTick = () => {
    this.props.play(this.props.focusedPage.timebarUuid);
    _get(console, ['profile'])('tick');
    setTimeout(() => {
      _get(console, ['profileEnd'])('tick');
      this.props.pause(this.props.focusedPage.timebarUuid);
    }, HSC_ORCHESTRATION_FREQUENCY);
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
          WDYU {_get(window, ['whyDidYouUpdate', 'loaded'], false) ? 'ON' : 'OFF'}
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
        <MenuItem
          eventKey="8"
          onClick={this.printReactWastedRenders}
          {...buttonsProps}
        >
          WASTED RENDERS
        </MenuItem>
        <MenuItem
          eventKey="9"
          onClick={this.profileTick}
          {...buttonsProps}
        >
          PROFILE TICK
        </MenuItem>

      </DropdownButton>
    );
  }
}
