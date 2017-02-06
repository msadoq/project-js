import React, { PureComponent, PropTypes } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import getLogger from 'common/log';
import classnames from 'classnames';
import DebugContainer from '../Navigation/DebugContainer';
import Help from '../Navigation/Help';
import Explorer from '../Navigation/Explorer';
import HelpContent from '../Navigation/HelpContent';
import MasterSessionContainer from '../Navigation/MasterSessionContainer';
import HealthContainer from '../Navigation/HealthContainer';
import MessagesContainer from '../Navigation/MessagesContainer';
import TabsContainer from '../Navigation/TabsContainer';
import PageContainer from '../Page/PageContainer';
import TimebarMasterContainer from '../Timebar/TimebarMasterContainer';
import styles from './Window.css';
import ExplorerContainer from '../Explorer/ExplorerContainer';
// import DummyDrag from '../Navigation/DummyDrag';

const logger = getLogger('Window');

export default class Window extends PureComponent {
  static propTypes = {
    windowId: PropTypes.string.isRequired,
    focusedPageId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    windowId: PropTypes.string,
  };

  state = {
    displayHelp: false,
    displayExplorer: false,
  }

  getChildContext() {
    return {
      windowId: this.props.windowId,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.toggleHelpShortCut);
    document.addEventListener('keydown', this.toggleExplorerShortCut);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleHelpShortCut);
    document.removeEventListener('keydown', this.toggleExplorerShortCut);
  }

  toggleHelpShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleHelp();
    } else if (e.keyCode === 27 && this.state.displayHelp) {
      this.toggleHelp();
    }
  }

  toggleHelp = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      displayHelp: !this.state.displayHelp,
    });
  }

  toggleExplorerShortCut = (e) => {
    if (e.keyCode === 72 && e.ctrlKey) {
      this.toggleExplorer();
    } else if (e.keyCode === 27 && this.state.displayExplorer) {
      this.toggleExplorer();
    }
  }

  toggleExplorer = () => {
    this.setState({
      displayExplorer: !this.state.displayExplorer,
    });
  }

  render() {
    logger.debug('render');
    const { focusedPageId, windowId, title } = this.props;
    const { displayHelp, displayExplorer } = this.state;

    return (
      <div className={styles.container}>
        {displayHelp ? <HelpContent /> : ''}
        <ButtonToolbar className={styles.tools}>
          <MasterSessionContainer />
          <HealthContainer windowId={windowId} />
          <MessagesContainer />
          <Help toggleHelp={this.toggleHelp} />
          <Explorer toggleExplorer={this.toggleExplorer} />
          <DebugContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
            toggleHelp={this.toggleHelp}
          />
          {/* <DummyDrag /> */}
        </ButtonToolbar>
        <div className={styles.divPagesTb}>
          <div className={styles.contentDiv}>
            <div className={styles.contentDivChildPage}>
              <TabsContainer
                className={classnames(
                  styles.TabsContainer
                )}
                windowId={windowId}
                focusedPageId={focusedPageId}
                title={title}
              />
              <div className={styles.content}>
                <PageContainer
                  windowId={windowId}
                  focusedPageId={focusedPageId}
                />
              </div>
            </div>
            {displayExplorer && <div className={styles.contentDivChildExplorer}>
              <ExplorerContainer
                windowId={windowId}
              />
            </div>}
          </div>
          <TimebarMasterContainer
            windowId={windowId}
            focusedPageId={focusedPageId}
          />
        </div>
      </div>
    );
  }
}
