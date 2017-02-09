import { clipboard } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import {
  MenuItem,
  DropdownButton,
  Glyphicon,
} from 'react-bootstrap';
import Perf from 'react-dom/lib/ReactPerf';
import { get } from 'common/parameters';
import Console from 'common/utils/console';
import dataMapGenerator from '../../dataManager/map';
import { updateCacheInvalidation } from '../../store/actions/hsc';
import { main } from '../ipc';

const buttonsProps = {
  bsSize: 'small',
  bsStyle: 'link',
};

export default class Debug extends PureComponent {
  static propTypes = {
    dummy: PropTypes.func.isRequired,
    toggleHelp: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    focusedPage: PropTypes.shape({
      timebarUuid: PropTypes.string,
    }),
  };
  static defaultProps = {
    focusedPage: { timebarUuid: null },
  };
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  serverDebug = () => {
    main.serverDebug(debug => Console.log(debug));
  };

  dataMap = () => {
    const state = this.context.store.getState();
    return Console.log(dataMapGenerator(state));
  };

  cleanCache = () => {
    this.context.store.dispatch(updateCacheInvalidation(Date.now() - 1e10));
    this.props.dummy();
  };

  copyStateToClipboard = () => {
    clipboard.writeText(JSON.stringify(this.context.store.getState()));
    return Console.log('store state exported to clipboard');
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
      Console.log('WASTED');
      Perf.printWasted();
      Console.log('INCLUSIVE');
      Perf.printInclusive();
      Console.log('EXCLUSIVE');
      Perf.printExclusive();
      this.props.pause(this.props.focusedPage.timebarUuid);
    }, get('ORCHESTRATION_FREQUENCY'));
  }

  profileTick = () => {
    this.props.play(this.props.focusedPage.timebarUuid);
    Console.profile('tick');
    setTimeout(() => {
      Console.profileEnd('tick');
      this.props.pause(this.props.focusedPage.timebarUuid);
    }, get('ORCHESTRATION_FREQUENCY') * 2 * 3);
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
