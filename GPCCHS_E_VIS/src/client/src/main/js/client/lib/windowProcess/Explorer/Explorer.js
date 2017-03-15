import React, { PureComponent, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import PerRemoteIdContainer from './components/PerRemoteIdContainer';
import PerViewContainer from './components/PerViewContainer';
import ServerInfoContainer from './components/ServerInfoContainer';
import HealthContainer from './components/HealthContainer';

import styles from './Explorer.css';

export default class Explorer extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
    currentExplorer: PropTypes.func.isRequired,
  }

  handleSelect = (eventKey) => {
    const { windowId, currentExplorer } = this.props;
    currentExplorer(windowId, eventKey);
  }

  render() {
    const { currentTab, windowId } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <Nav bsStyle="tabs" activeKey={currentTab} onSelect={this.handleSelect} >
            <NavItem eventKey="perRemoteId" title="Entry point list of current page">
              <div className={styles.tabs}>Data Map</div>
            </NavItem>
            <NavItem eventKey="perViewId" title="Entry point list per view on current page">
              <div className={styles.tabs}>View Map</div>
            </NavItem>
            <NavItem eventKey="server" title="Server information">
              <div className={styles.tabs}>Server</div>
            </NavItem>
          </Nav>
        </div>
        {(currentTab === 'perRemoteId') && <PerRemoteIdContainer windowId={windowId} />}
        {(currentTab === 'perViewId') && <PerViewContainer windowId={windowId} />}
        {(currentTab === 'server') && <ServerInfoContainer />}
        {(currentTab === 'health') && <HealthContainer />}
      </div>
    );
  }
}
