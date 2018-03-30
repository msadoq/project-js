// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add copy and log buttons in dataMap and store explorers
// END-HISTORY
// ====================================================================

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Inspector from 'react-json-inspector';
import { SplitButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import { clipboard } from 'electron';
import styles from '../Explorer.css';

export default class DataMap extends PureComponent {

  static propTypes = {
    map: PropTypes.shape({
      perView: PropTypes.object,
      perRemoteId: PropTypes.object,
      expectedIntervals: PropTypes.object,
    }).isRequired,
  };

  copyToClipboard = (eventKey) => {
    let objToCopy = this.props.map;
    if (eventKey === 'perView') {
      objToCopy = this.props.map.perView;
    } else if (eventKey === 'perRemoteId') {
      objToCopy = this.props.map.perRemoteId;
    } else if (eventKey === 'expectedIntervals') {
      objToCopy = this.props.map.expectedIntervals;
    }
    clipboard.writeText(JSON.stringify(objToCopy));
    return console.log('map exported to clipboard', objToCopy); // eslint-disable-line no-console
  };

  logInConsole = (eventKey) => {
    if (eventKey === 'perView') {
      console.log('perView:', this.props.map.perView); // eslint-disable-line no-console
    } else if (eventKey === 'perRemoteId') {
      console.log('perRemoteId:', this.props.map.perRemoteId); // eslint-disable-line no-console
    } else if (eventKey === 'expectedIntervals') {
      // eslint-disable-next-line no-console
      console.log('expectedIntervals:', this.props.map.expectedIntervals);
    } else {
      console.log('dataMap:', this.props.map); // eslint-disable-line no-console
    }
  }

  render() {
    return (
      <div>
        <ButtonToolbar className={styles.buttonGroup} >
          <SplitButton
            bsStyle="default"
            title="Copy"
            onSelect={this.copyToClipboard}
            onClick={this.copyToClipboard}
            id="copy"
          >
            <MenuItem eventKey="perView">perView</MenuItem>
            <MenuItem eventKey="perRemoteId">perRemoteId</MenuItem>
            <MenuItem eventKey="expectedIntervals">expectedIntervals</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="dataMap">DataMap</MenuItem>
          </SplitButton>
          <SplitButton
            bsStyle="default"
            title="Log"
            onSelect={this.logInConsole}
            onClick={this.logInConsole}
            id="log"
          >
            <MenuItem eventKey="perView">perView</MenuItem>
            <MenuItem eventKey="perRemoteId">perRemoteId</MenuItem>
            <MenuItem eventKey="expectedIntervals">
              expectedIntervals
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="dataMap">DataMap</MenuItem>
          </SplitButton>
        </ButtonToolbar>
        <div>
          <Inspector data={this.props.map} />
        </div>
      </div>
    );
  }
}
