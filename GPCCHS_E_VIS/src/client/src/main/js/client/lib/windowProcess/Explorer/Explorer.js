import React, { PureComponent, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import PerRemoteIdContainer from './components/PerRemoteIdContainer';
import PerViewContainer from './components/PerViewContainer';
// import ServerInfoContainer from './components/ServerInfoContainer';
import styles from './Explorer.css';

export default class Explorer extends PureComponent {
  static propTypes = {
    // dcStatus: PropTypes.string,
    // hssStatus: PropTypes.string,
    // lastPubSubTime: PropTypes.number,
    perRemoteId: PropTypes.object,
    perView: PropTypes.object,
    // server: PropTypes.object,
    windowId: PropTypes.string.isRequired,
    currentExplorer: PropTypes.func,
    currentTab: PropTypes.string,
    parseFormula: PropTypes.func,
    views: PropTypes.object,
  }


  handleSelect = (eventKey) => {
    const { windowId, currentExplorer } = this.props;
    event.preventDefault();
    if (eventKey === 'perRemoteId') {
      currentExplorer(windowId, 'perRemoteId');
    } else if (eventKey === 'perViewId') {
      currentExplorer(windowId, 'perViewId');
    } else if (eventKey === 'health') {
      currentExplorer(windowId, 'health');
    } else if (eventKey === 'server') {
      currentExplorer(windowId, 'server');
    }
  }

  display = () => {
    const { currentTab, perView, parseFormula, views, perRemoteId } = this.props;
    if (currentTab === 'perRemoteId') {
      return (<PerRemoteIdContainer
        perRemoteId={perRemoteId}
      />);
    } else if (currentTab === 'perViewId') {
      return (<PerViewContainer
        perView={perView}
        parseFormula={parseFormula}
        views={views}
      />);
    } else if (currentTab === 'health') {
      return (<div>tab3</div>);
    } else if (currentTab === 'server') {
      // return (<ServerInfoContainer
      //   server={server}
      // />);
      // return (<div>tab3</div>);
    }
  }


  render() {
    const { currentTab } = this.props;
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={currentTab} onSelect={this.handleSelect} className={styles.tabs}>
          <NavItem eventKey="perRemoteId" title="Entry point list of current page">Data Map</NavItem>
          <NavItem eventKey="perViewId" title="Entry point list per view on current page">View Map</NavItem>
          {/* <NavItem eventKey="health" title="Application health">Health</NavItem>
          <NavItem eventKey="server" title="Server information">Server</NavItem>*/}
        </Nav>
        {this.display()}
      </div>
    );
  }
}
