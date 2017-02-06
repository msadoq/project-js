import React, { PureComponent, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import _debounce from 'lodash/debounce';
import classnames from 'classnames';
import PerRemoteIdContainer from './components/PerRemoteIdContainer';
import PerViewContainer from './components/PerViewContainer';
// import ServerInfoContainer from './components/ServerInfoContainer';
import styles from './Explorer.css';

const minWidth = 20;

export default class Explorer extends PureComponent {
  static propTypes = {
    // dcStatus: PropTypes.string,
    // hssStatus: PropTypes.string,
    // lastPubSubTime: PropTypes.number,
    perRemoteId: PropTypes.objectOf(PropTypes.object),
    perView: PropTypes.objectOf(PropTypes.object),
    // server: PropTypes.object,
    windowId: PropTypes.string.isRequired,
    currentExplorer: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired,
    parseFormula: PropTypes.func.isRequired,
    views: PropTypes.objectOf(PropTypes.object),
    updateExplorerWidth: PropTypes.func.isRequired,
    width: PropTypes.number,
  }
  static defaultProps = {
    perRemoteId: {},
    perView: {},
    views: {},
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
      return (<div>tab3</div>);
    }
    return (<div />);
  }


  render() {
    const { currentTab, width } = this.props;
    const { resizingWindow } = this.state;
    return (
      <div
        ref={this.assignEl}
        style={{
          flex: '0 0 auto',
          width: `${width}px`,
          background: '#FAFAFA',
          borderLeft: '1px solid #aaa',
          zIndex: '2',
          padding: '0px 5px',
        }}
      >
        <div>
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
            {/* <NavItem eventKey="health" title="Application health">Health</NavItem>
            <NavItem eventKey="server" title="Server information">Server</NavItem>*/}
          </Nav>
          {this.display()}
        </div>
      </div>
    );
  }
}
