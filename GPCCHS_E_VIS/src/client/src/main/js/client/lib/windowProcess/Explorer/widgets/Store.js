// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add dataMap and store explorer widgets
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : FIx linting error in widgets/Store
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Add copy and log buttons in dataMap and store explorers
// END-HISTORY
// ====================================================================

import React, { PropTypes, PureComponent } from 'react';
import { ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap';
import Inspector from 'react-json-inspector';
import { clipboard } from 'electron';
import _lowerFirst from 'lodash/lowerFirst';
import { getAvailableViews } from 'viewManager';
import styles from '../Explorer.css';

export default class Store extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types, "DV6 TBC_CNES Unpredicatable object struct."
    state: PropTypes.object.isRequired,
  };

  copyToClipboard = (eventKey) => {
    const { state } = this.props;
    let objToCopy = {};
    if (eventKey === 'viewData') {
      const viewNames = getAvailableViews();
      viewNames.forEach((viewName) => {
        const viewDataName = _lowerFirst(viewName).concat('Data');
        objToCopy = { ...objToCopy, [viewDataName]: state[viewDataName] };
      });
    } else if (eventKey === 'viewConfiguration') {
      const viewNames = getAvailableViews();
      viewNames.forEach((viewName) => {
        const viewDataName = viewName.concat('Configuration');
        objToCopy = { ...objToCopy, [viewDataName]: state[viewDataName] };
      });
    } else if (eventKey === 'domainSession') {
      objToCopy = { sessions: state.sessions,
        domains: state.domains,
        masterSession: state.masterSession };
    } else {
      objToCopy = state;
    }
    clipboard.writeText(JSON.stringify(objToCopy, null, 2));
    return console.log('state exported to clipboard', objToCopy); // eslint-disable-line no-console
  }

  logInConsole = (eventKey) => {
    const { state } = this.props;
    let objToCopy = {};
    if (eventKey === 'viewData') {
      const viewNames = getAvailableViews();
      viewNames.forEach((viewName) => {
        const viewDataName = _lowerFirst(viewName).concat('Data');
        console.log(viewDataName, ':', state[viewDataName]); // eslint-disable-line no-console
      });
    } else if (eventKey === 'viewConfiguration') {
      const viewNames = getAvailableViews();
      viewNames.forEach((viewName) => {
        const viewDataName = viewName.concat('Configuration');
        console.log(viewDataName, ':', state[viewDataName]); // eslint-disable-line no-console
      });
    } else if (eventKey === 'domainSession') {
      objToCopy = { sessions: state.sessions,
        domains: state.domains,
        masterSession: state.masterSession };
      console.log(objToCopy); // eslint-disable-line no-console
    } else {
      console.log(state); // eslint-disable-line no-console
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
            <MenuItem eventKey="viewData">View Data</MenuItem>
            <MenuItem eventKey="viewConfiguration">View Configuration</MenuItem>
            <MenuItem eventKey="domainSession">Domain Session</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="store">Store</MenuItem>
          </SplitButton>
          <SplitButton
            bsStyle="default"
            title="Log"
            onSelect={this.logInConsole}
            onClick={this.logInConsole}
            id="log"
          >
            <MenuItem eventKey="viewData">View Data</MenuItem>
            <MenuItem eventKey="viewConfiguration">View Configuration</MenuItem>
            <MenuItem eventKey="domainSession">Domain Session</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="store">Store</MenuItem>
          </SplitButton>
        </ButtonToolbar>
        <div>
          <Inspector data={this.props.state} />
        </div>
      </div>
    );
  }
}
