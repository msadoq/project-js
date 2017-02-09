import React, { PureComponent, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import _debounce from 'lodash/debounce';
import classnames from 'classnames';
import PerRemoteIdContainer from './components/PerRemoteIdContainer';
import PerViewContainer from './components/PerViewContainer';
import ServerInfoContainer from './components/ServerInfoContainer';
import HealthContainer from './components/HealthContainer';
import styles from './Explorer.css';

const minWidth = 20;
const initWidth = 150;

export default class Explorer extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    currentTab: PropTypes.string.isRequired,
    width: PropTypes.number,
    currentExplorer: PropTypes.func.isRequired,
    updateExplorerWidth: PropTypes.func.isRequired,
  }
  static defaultProps = {
    width: undefined,
  }
  state = {
    resizingWindow: false,
  }

  resizeWindow = (e) => {
    this.setState({
      resizingWindow: true,
      cursorOriginX: e.pageX,
      widthOrigin: this.el.clientWidth,
      width: this.el.clientWidth,
    });

    document.addEventListener('mousemove', this.resizeWindowMouseMove);
    document.addEventListener('mouseup', this.resizeWindowMouseUp);
    e.stopPropagation();
  }

  resizeWindowMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.resizingWindow) {
      const movedPx = this.state.cursorOriginX - e.pageX;
      let newWidth = this.state.widthOrigin + movedPx;
      newWidth = newWidth < minWidth ? minWidth : newWidth;
      this.el.style.width = `${newWidth}px`;

      if (!this.updateWidthdebounce) {
        this.updateWidthdebounce = _debounce(this.willUpdateWidth, 300);
      }
      this.updateWidthdebounce(newWidth);
    }
  }

  willUpdateWidth = (width) => {
    this.props.updateExplorerWidth(
      this.props.windowId,
      width
    );
  }

  assignEl = (el) => { this.el = el; }

  resizeWindowMouseUp = (e) => {
    document.removeEventListener('mousemove', this.resizeWindowMouseMove);
    document.removeEventListener('mouseup', this.resizeWindowMouseUp);
    this.setState({ resizingWindow: false });
    e.preventDefault();
  }

  handleSelect = (eventKey) => {
    const { windowId, currentExplorer } = this.props;
    currentExplorer(windowId, eventKey);
  }

  render() {
    const { currentTab, width } = this.props;
    const { resizingWindow } = this.state;
    return (
      <div
        ref={this.assignEl}
        style={{
          flex: '0 0 auto',
          background: '#FAFAFA',
          borderLeft: '1px solid #aaa',
          width: `${width || initWidth}px`,
          zIndex: '2',
          padding: '0px 5px',
          height: '100%',
        }}
      >
        <div>
          <hr
            onMouseDown={this.resizeWindow}
            className={
              classnames(
                styles.resizeContainer,
                (resizingWindow ? styles.resizingContainer : null)
              )
            }
          />
        </div>
        <Nav bsStyle="tabs" activeKey={currentTab} onSelect={this.handleSelect} >
          <NavItem eventKey="perRemoteId" title="Entry point list of current page">
            <div className={styles.tabs}>Data Map</div>
          </NavItem>
          <NavItem eventKey="perViewId" title="Entry point list per view on current page">
            <div className={styles.tabs}>View Map</div>
          </NavItem>
          {/* <NavItem eventKey="health" title="Application health">
            <div className={styles.tabs}>Health</div>
          </NavItem>*/}
          <NavItem eventKey="server" title="Server information">
            <div className={styles.tabs}>Server</div>
          </NavItem>
        </Nav>
        {(currentTab === 'perRemoteId') && <PerRemoteIdContainer />}
        {(currentTab === 'perViewId') && <PerViewContainer />}
        {(currentTab === 'server') && <ServerInfoContainer />}
        {(currentTab === 'health') && <HealthContainer />}
      </div>
    );
  }
}
